import React, { useEffect, useState } from 'react';
import styles from './Fixed.module.css';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Nav = () => {
  const [isLogined, setIsLogined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLogined(loggedIn);
  }, []);

  const handleLogout = () => {
    // 세션과 로컬 스토리지에서 로그인 관련 데이터 제거
    localStorage.removeItem('memberToken');
    localStorage.removeItem('savedId');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('isLoggedIn');

    // 로그인 상태를 false로 업데이트
    setIsLogined(false);

    // 로그인 페이지로 이동
    navigate('/login');
  };

  const goToBlue = () => {
    navigate('/blue');
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/firstsignup');
  };

  const goToCommu = () => {
    navigate('/comm_list');
  };

  const goToMypage = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      if (role === 'Expert') {
        navigate(`/promember/${userId}`);
      } else {
        navigate(`/member/${userId}`);
      }
    } else {
      console.error('사용자 ID를 찾을 수 없습니다.');
    }
  };

  const map = () => {
    navigate('/hospital_map');
  };

   //로그인 토큰 가져오기
   const [role, setRole] = useState(null);

   useEffect(() => {
    const memberToken = localStorage.getItem('memberToken');
    if (memberToken) {
      try {
        const decodedmemberToken = jwtDecode(memberToken);
        setRole(decodedmemberToken.role);
        setIsLogined(true);
      } catch (error) {
        console.error('토큰 해독 실패', error);
        setIsLogined(false);
      }
    } else {
      setIsLogined(false);
    }
  }, []);


  return (
    <header>
      <div className={styles.header}>
        <div className={styles.textalign1} onClick={goToMain}>끄적임</div>

        <div className={styles.textalign2}>
          <div className={styles.text2margin}>
            {isLogined ? (
              <div onClick={handleLogout}>로그아웃</div>
            ) : (
              <div onClick={goToLogin}>로그인</div>
            )}
          </div>

          <div className={styles.text2margin}>
            <div style={{ color: 'gray' }}>|</div>
          </div>

          <div className={styles.text2margin}>
            {isLogined ? (
              <div onClick={goToMypage}>마이페이지</div>
            ) : (
              <div onClick={goToSignup}>회원가입</div>
            )}
          </div>  
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navflex}>
          <li className={styles.navTextMargin} onClick={goToCommu}>커뮤니티</li>
          <li style={{ color: 'gray' }} className={styles.navTextMargin}>|</li>
          <li className={styles.navTextMargin} onClick={goToBlue}>자가진단</li>
          <li style={{ color: 'gray' }} className={styles.navTextMargin}>|</li>
          <li className={styles.navTextMargin} onClick={map}>내 주변 병원 찾기</li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;