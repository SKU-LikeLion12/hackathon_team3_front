import React, { useEffect, useState } from 'react';
import styles from './Fixed.module.css';
import { useNavigate } from 'react-router-dom';

const LoginNav = () => {
  const navigate = useNavigate(); // useNavigate 훅을 통해 페이지 이동

  const goToBlue = () => {
    navigate('/blue');
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToMypage = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/member/${userId}`);
    } else {
      console.error('사용자 ID를 찾을 수 없습니다.');
    }
  };

  const goToCommu = () => {
    navigate('/comm_list');
  };

  const map = () => {
    navigate('/hospital_map');
  };

  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLogined(loggedIn);
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('memberToken');
    localStorage.removeItem('savedId');
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <header> 
      <div className={styles.header}>
        <div className={styles.textalign1} onClick={goToMain}>끄적임</div>

        <div className={styles.textalign2}>
          <div className={styles.text2margin}>
            <div onClick={handleLogout}>로그아웃</div>
          </div>

          <div className={styles.text2margin}>
            <div style={{color: 'gray'}}>|</div>
          </div>

          <div className={styles.text2margin}>
            <div onClick={goToMypage}>마이페이지</div>
          </div>  
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navflex}>
          <li className={styles.navTextMargin} onClick={goToCommu}>커뮤니티</li>
          <li style={{color: 'gray'}} className={styles.navTextMargin}>|</li>
          <li className={styles.navTextMargin} onClick={goToBlue}>자가진단</li>
          <li style={{color: 'gray'}} className={styles.navTextMargin}>|</li>
          <li className={styles.navTextMargin} onClick={map}>내 주변 병원 찾기</li>
        </ul>
      </nav>
    </header>
  );
};

export default LoginNav;