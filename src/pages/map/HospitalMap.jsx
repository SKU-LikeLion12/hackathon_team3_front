import React, { useState, useEffect } from 'react';
import styles from '../Mypage/Mypage.module.css';
import commstyles from '../Community/Comm.module.css';
import { FaAngleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const HospitalMap = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };
  const goToMap = () => {
    navigate('/hospital_map');
  };

  const [map, setMap] = useState(null); // 지도 객체 상태
  const [markers, setMarkers] = useState([]); // 마커 객체 배열 상태
  const [pagination, setPagination] = useState(null); // 페이지네이션 객체 상태
  const [keyword, setKeyword] = useState('정신건강'); // 검색 키워드 상태
  const [ps, setPs] = useState(null); // 장소 검색 객체 상태
  const [currentPosition, setCurrentPosition] = useState({ latitude: null, longitude: null }); // 현재 위치 상태
  const [currentAddress, setCurrentAddress] = useState(""); // 현재 위치 주소 상태

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ latitude, longitude });
      localStorage.setItem('currentPosition', JSON.stringify({ latitude, longitude }));
      initializeMap(latitude, longitude);
      reverseGeocode(latitude, longitude);
    };

    const handleError = (error) => {
      console.error('Geolocation error:', error);
      // Fallback to a default location if geolocation fails
      const defaultLatitude = 37.566826;
      const defaultLongitude = 126.9786567;
      setCurrentPosition({ latitude: defaultLatitude, longitude: defaultLongitude });
      localStorage.setItem('currentPosition', JSON.stringify({ latitude: defaultLatitude, longitude: defaultLongitude }));
      initializeMap(defaultLatitude, defaultLongitude);
      reverseGeocode(defaultLatitude, defaultLongitude);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to a default location if geolocation is not supported
      const defaultLatitude = 37.566826;
      const defaultLongitude = 126.9786567;
      setCurrentPosition({ latitude: defaultLatitude, longitude: defaultLongitude });
      localStorage.setItem('currentPosition', JSON.stringify({ latitude: defaultLatitude, longitude: defaultLongitude }));
      initializeMap(defaultLatitude, defaultLongitude);
      reverseGeocode(defaultLatitude, defaultLongitude);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=31fe1ee21bc1d16dcb5eb09b81091e8f&libraries=services,clusterer,drawing';
    script.onload = () => {
      // API 로드 후, 현재 위치가 설정되어야 하므로 여기서 초기화 작업을 수행할 수 있습니다.
      if (currentPosition.latitude && currentPosition.longitude) {
        initializeMap(currentPosition.latitude, currentPosition.longitude);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentPosition]);

  useEffect(() => {
    if (map && ps) {
      searchPlaces();
    }
  }, [map, ps]);

  const initializeMap = (latitude, longitude) => {
    if (typeof window.kakao !== 'undefined') {
      const mapContainer = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 6,
      };
      const newMap = new window.kakao.maps.Map(mapContainer, options);
      setMap(newMap);

      // 사용자의 현재 위치에 마커 추가
      addMarker(latitude, longitude, newMap);

      const newPs = new window.kakao.maps.services.Places();
      setPs(newPs);
    } else {
      console.log('Kakao 지도 API 스크립트가 로드되지 않았습니다.');
    }
  };

  const addMarker = (latitude, longitude, map, title = null) => {
    const position = new window.kakao.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: position,
      title: title,
    });
    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  const searchPlaces = () => {
    if (!ps) return;

    ps.keywordSearch(keyword, placesSearchCB, {
      location: new window.kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
      radius: 5000,
    });
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      setPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (places) => {
    const placesList = document.getElementById('placesList');
    placesList.innerHTML = ''; // 기존 목록 초기화

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    places.forEach((place, index) => {
      // 리스트 아이템 생성
      const item = document.createElement('li');
      item.className = 'item';

      // 마커 배경 클래스 설정
      const markerClass = `markerbg marker_${index + 1}`;

      // 리스트 아이템 내용 구성
      const content = `
        <div class="${markerClass}"></div>
        <div class="info" style="border-bottom: 1px solid #84A67F;">
          <h5>${place.place_name}</h5>
          <span class="gray">${place.address_name}</span><br>
          <span class="tel">${place.phone}</span>
        </div>
      `;
      item.innerHTML = content;

      // 리스트에 아이템 추가
      placesList.appendChild(item);

      // 마커 추가
      const marker = addMarker(place.y, place.x, map, place.place_name);

      // 클릭 이벤트 추가
      item.onclick = () => {
        map.panTo(new window.kakao.maps.LatLng(place.y, place.x));
        if (marker) {
          marker.setZIndex(1);
        }
      };
    });

    // 페이지네이션 업데이트
    updatePagination();
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchPlaces();
  };

  const updatePagination = () => {
    const paginationEl = document.getElementById('pagination');
    paginationEl.innerHTML = ''; // 기존 페이지네이션 초기화

    if (pagination) {
      for (let i = 1; i <= pagination.last; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.onclick = (e) => {
          e.preventDefault();
          pagination.gotoPage(i);
        };
        paginationEl.appendChild(pageLink);
      }
    }
  };

  const reverseGeocode = (latitude, longitude) => {
    if (typeof window.kakao !== 'undefined') {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const latlng = new window.kakao.maps.LatLng(latitude, longitude);

      geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          setCurrentAddress(address); // 상태 업데이트
        } else {
          console.error('주소를 가져오는 데 실패했습니다.');
        }
      });
    } else {
      console.log('Kakao 지도 API 스크립트가 로드되지 않았습니다.');
    }
  };

  return (
    <div className={styles.map_container}>
      {/* 왼쪽 */}
      <div className={styles.CommList_left}>
        <h2 className={styles.CommList_left_h2}>끄적임</h2>
        <p className={styles.CommList_left_h2}>
          내 주변 병원을 검색하여
          <br />
          빠르게 가까운 병원에서
          <br />
          상담을 받아보세요☺️
        </p>
      </div>

      {/* 지도 있는 부분 */}
      <div className={styles.map}>
        <div className={styles.CommList_right_header}>
          <p className={commstyles.header_p} onClick={goToMain}>
            홈 <FaAngleRight />
          </p>
          <p className={commstyles.header_p2} onClick={goToMap}>
            내 주변 병원찾기
          </p>
        </div>

        <div className={commstyles.CommList_right_header}>
          <p className={styles.header_p}>나의 현재 위치</p>
          <p className={styles.header_p2}>{currentAddress || '주소를 가져오는 중...'}</p>
        </div>

        <div className={styles.map_box} id="map"></div>
      </div>

      {/* 젤 오른쪽 */}
      <div className={styles.location}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.search}>
            <CiSearch className={styles.icon} />
            <input
              type="text"
              defaultValue={keyword}
              onChange={handleKeywordChange}
              className={styles.searchBar}
              placeholder="본인 거주지 입력하기"
            />
          </div>
        </form>

        {/* 여기가 검색한 부분 */}
        <div className={styles.search_location}>
          <ul id="placesList" className={styles.placesList}>
            {/* 검색 결과 목록 */}
          </ul>
          <div id="pagination">{/* 페이지네이션 */}</div>
        </div>
      </div>
    </div>
  );
};

export default HospitalMap;
