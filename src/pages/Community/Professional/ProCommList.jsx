import React, { useContext, useState, useEffect } from 'react';
import styles from '../Comm.module.css';
import 'pretendard/dist/web/static/pretendard.css';
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { category, category2, CategoryContext } from '../../../components/Comm/Comm_context';
import axios from 'axios';

export default function ProCommList() {
  const navigate = useNavigate();
  const goToComm = () => { navigate('/comm_list') };

  const [proCommlist, setproCommlist] = useState([]);
  const proToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3bmdsMTIzIiwiaWF0IjoxNzIxODI4MjA4LCJyb2xlIjoiRXhwZXJ0IiwiZXhwIjoxNzIxODMxODA4fQ.9IZnTQVTHd0OKxrDwyPUu72DAaTIEKXFK9hu7Md45JAr8ZR8yUKphDKXIxshvxOVa2-Ojrpvh05HUQWRN5bWrA';

  const [role, setRole] = useState(null);

   //로그인 토큰 가져오기
   useEffect(() => {
    const memberToken = localStorage.getItem('memberToken');
    if (memberToken) {
      try {
        const decodedmemberToken = jwtDecode(memberToken);
        setRole(decodedmemberToken.role);
      } catch (error) {
        console.error('토큰 해독 실패', error);
      }
    }
  }, []);
  //=============================================================
  const [order, setOrder] = useState(1); 

  // Order 변경 처리
  const clickOrder = (event) => {
    const selectedValue = event.target.value;
    setOrder(selectedValue);
  };

  // 전문 커뮤니티 리스트 가져오기
  const fetchProCommList = async () => {
    try {
      const response = await axios.get(`http://52.78.131.56:8080/expert/postall/${order}`, {
        headers: { Authorization: `Bearer ${proToken}` },
      });

      setproCommlist(response.data);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    fetchProCommList();
  }, []);

  // 끄적이기 로그인 여부 확인
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLogined(loggedIn);
  }, []);

  // 로그인 여부 확인 후 링크 이동
  const handleLoginClick = () => {
    if (!isLogined) {
      sessionStorage.setItem('redirectPath', '/pro_comm_write');
      navigate('/login');
    } else {
      navigate('/pro_comm_write');
    }
  };

  const goToMain = () => {
    navigate('/');
  };

  const { categoryBtn, ClickCategory } = useContext(CategoryContext);

  return (
    <div className={styles.CommList_container}>
      {/* 왼쪽 */}
      <div className={styles.CommList_left}>
        <h2 className={styles.CommList_left_h2}>커뮤니티</h2>
        <p className={styles.CommList_left_h2}>
          끄적여봐,<br />
          깊이 담긴 내면의 이야기들을<br />
          우리가 끄덕여줄게.
        </p>
        <Link to='/comm_list' style={{ textDecoration: 'none', color: 'inherit' }}>
          <p className={styles.CommList_left_p2}>고민 끄적끄적</p>
        </Link>
        <p className={styles.CommList_left_p}>전문의 정보 끄적끄적</p>
      </div>

      {/* 오른쪽 부분 */}
      <div className={styles.CommList_right}>
        <div className={styles.CommList_right_header}>
          <p className={styles.header_p}> <span onClick={goToMain}>홈</span> <FaAngleRight /> <span onClick={goToComm}>커뮤니티</span> <FaAngleRight /></p>
          <p className={styles.header_p2}>전문의 정보 끄적끄적</p>
        </div>

        {/* <div className={styles.header_category}>
          <div className={styles.CommList_right_header}>
            {category.map((v, i) => (
              <button key={i}
                className={`${styles.header_btn} ${categoryBtn === v ? styles.selected_header_btn : ''}`}
                onClick={() => ClickCategory(v)}>{v}</button>
            ))}
          </div>
          <div className={styles.CommList_right_header}>
            {category2.map((v, i) => (
              <button key={i}
                className={`${styles.header_btn} ${categoryBtn === v ? styles.selected_header_btn : ''}`}
                onClick={() => ClickCategory(v)}>{v}</button>
            ))}
          </div> 
        </div>*/}

        {/* 중간 부분 */}
        <div className={styles.CommList_right_mid}>
          <p className={styles.right_mid_p}>총 건 {proCommlist.length}</p>
          <div className={styles.right_mid}>
            <button className={styles.right_mid_btn} onClick={handleLoginClick}>끄적이기</button>
            <select className={styles.right_mid_select} onChange={clickOrder} value={order}>
              <option value={1}>최신순</option>
              <option value={2}>좋아요순</option>
              <option value={3}>댓글순</option>
              <option value={4}>저장순</option>
            </select>
          </div>
        </div>

        {/* 메인 부분 */}
        <div className={styles.CommList_right_main}>
  {proCommlist.map((post, i) => (
    <Link key={post.id} to={`/pro_comm_view/${post.id}`} className={styles.CommList_main}>
      <h3 className={styles.main_h3}>{post.title}</h3>
      <p className={styles.main_p}>{post.content}</p>

      {/* 맨 밑에 부분 */}
      <div className={styles.CommList_main_bottom}>
        {/* 맨 밑 왼쪽 */}
        <div className={styles.main_bottom}>
          <img className={styles.main_img} alt='' src='../img/profile.jpg'></img>
          <p className={styles.main_p}>{post.writer}</p>
          <p className={styles.p_line}></p>
          <p className={styles.main_p2}>{post.createDate}</p>
        </div>
        <div className={styles.main_bottom2}>
          <img className={styles.main_icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGzSURBVHgB3VTtUcJAEN0wFBArMHSAFSTpIFQgVgAdIBWAFRgrkA6SVCBWYKzAdBDfgz3mCHdhxow/dGcud5fdffduP07kr0ogA6QsywJTgpFjRFwHQfAYx/F6EHhRFBmAXl26tm1v0jRtRvJzCX0KAnMeAr7DaBz/c7PwhgXXZvxWWE7lyJJAe1z5BcxytVnCZmO51dBDndZOcDhEcHiWY6J8cgLR2G+w/8T/uQG+AFdgVkCkAE+YdwpC9pnehvpGD9j7GJyBW6W1V0dXTElii0MWSuDOZzeyHOYKXPcBU6BbkoveYOmzs6sl4wfAawIzRLjJF5Omh2fYt0y0seOMG9xfBYdRrKxyS9841qHalZrEiERc4GNlFapTbRSa9Ym1L+WyupjMW9ECEB/z35ATE8YXU2jeBdxmilC9dR2gfzChg88Hpsj4SA9zU6+HxGr91h17ApRc8HDRcFwtRSv7K80B/6UYlTn8rLW17Y2fS/qaaGa3si1VVbHdWaJ1kiQTH/jY3jCe2v6MNy5QkFXZaf8F7BiSQ/tLjwx5uGZ974oT3DpkrkzZXKEyfZfjQ7aVfy3fA/EHOjSA094AAAAASUVORK5CYII=' alt=''></img>  
          <p className={styles.main_p}>{post.likeSize}</p>
          <img className={styles.main_icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGmSURBVHgBzVSBbYNADHxQBmAEMkHJBDwTNJ0gZIKmE6TdIJkgbNBsAExQusGPwAb0DDayKCVfVZViCf0lb5/v/fYb808WLG2WZRlhoc9kWebMX4lBmAdBsAO0k61r13VnJKnMb4hBGIPwQoQgqIkIn+PthJORzylN0xcvYiYtCYN0/5Mq+L3C7wjYsPriFnGBgEc4b27Vk0t14Z8OMdk0JlRqd3B487kkVlmN6oLggzi+EcNyXq/G00iEWluQv88Rx/gaUYvsBzquwlvCdV0fgROOaVSSPZYEe3ZKPDXqgJSAbjsQ5IIhomXfiC+6Zd/eVry2rNpwUC7YWrtReC1YKXdyAiReTxVTbSN9FA87COHcZsgKKywVtRCP8aJJFwEWqosSnWSsMd9ujG/rQUqD5KQz6ILN8KaMXbVSMU4FW3Z0UNTIf2EYpiAjklaGgk7Ik1joaV1NFamJ6q2qRl86FRGeAU/KpX8B+W0xc8QU9GmGiaIjSadYJHuWUwE/YO0fKiQln9nLW3yPxXhcrRnqH3FSR5j7PYaoJ5TCe3K9jOrv0033bV+xcd+AVWl8LgAAAABJRU5ErkJggg==' alt=''></img> 
          <p className={styles.main_p}>{post.commentSize}</p>
          <img className={styles.main_icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADsSURBVHgB7ZThDYIwEIWvxgEcATfACaQbMIIbiBPgBuIIjuAEtRO4AiOwAb4zNFED7WFq5AcvufRIufeR3hWiWf+WGtowxiRKqTvSFQXUtu1Ba1317S08dUeJOQsfsh/a8wGiSApocAxnhEVec86rpFAEgOEGZ1wgMpfzyuAYgBqGtXtA3rgVkGuoWAJIeKL6NtDcLUUAsBEY5m2irLUnhodqpU1OXiEwL3E8haRwSXKlDIH5TWo+FvCEwDwdUzCZi/Z7AM88QiPWiAsJb3KoB033W6jcBeu06yYqR+NL+kYwyD5n3/NuTrMmqwf5GGsmO2z7xQAAAABJRU5ErkJggg==' alt=''></img> 
          <p className={styles.main_p}>{post.saveSize}</p>
        </div>
      </div>
      {i !== 7 && <div className={styles.line}></div>}
    </Link>
  ))}
</div>

      </div>
    </div>
  );
}