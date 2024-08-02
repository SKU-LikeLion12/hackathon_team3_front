import React from 'react'
import styles from './Fixed.module.css'
import { useNavigate } from 'react-router-dom'


const LoginNav = () => {
  const Navigate =useNavigate();

  const goToBlue=()=>{
    Navigate('/blue')
  }

  const goToMain=()=>{
    Navigate("/")
  }

  const goToLogin=()=>{
    Navigate("login")
  }

  const goToMypage=()=>{
    Navigate("/profile/:userId")
  }
  const goToCommu=()=>{
    Navigate("comm_list")
  }

  const map=()=>{
    Navigate("hospital_map")
  }

   //로그아웃
   const handleLogout = () => {
    localStorage.removeItem('memberToken');
    localStorage.removeItem('savedId');
    sessionStorage.removeItem('isLoggedIn');
    Navigate('/login'); // 또는 로그아웃 후 이동할 페이지
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
  )
}

export default LoginNav