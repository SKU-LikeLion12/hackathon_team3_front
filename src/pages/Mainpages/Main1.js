import React, { useEffect, useState } from 'react'
import styles from './Main1.module.css'
import { useNavigate } from 'react-router-dom'


const Main1 = () => {
  const navgate = useNavigate();

  const goToBlue =()=>{
    navgate('/blue')
  }

  const goToMap=()=>{
    navgate('/hospital_map')
  }

   //로그인 유지
   const [isLogined, setIsLogined] = useState(false);

   useEffect(() => {
     const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
     setIsLogined(loggedIn);
   }, []);

  return (
    <div>
      
      <div className={styles.mainBox}>
            <div></div>
            <div className={styles.mainTitleText}>끄적임</div>
            <div className={styles.mainText}>시들어가는 나의 마음,<br/>
                따뜻하게 보듬어줄 손길을 찾는다면, <span style={{fontSize: 75 , fontWeight: 'bold', marginLeft: 30}}>끄적임</span>
            </div>
      </div>

      <div className={styles.main2Container}>
        <div className={styles.main2Text}>
          <img src={process.env.PUBLIC_URL + "/imges/clover.png"} alt=""/>
          <span>오늘 하루도 수고한 당신에게,</span><br/>
               끄적임이 건네는 다정함 한 스푼
        </div>

        <div className={styles.main2InBox}>
          <p>적어도 나는 네 덕분에 행복해졌다고, 말해주고 싶었어.</p>
        </div>
      </div>

      <div className={styles.main3Container}>
        <div className={styles.main3Box1}>
          <div className={styles.main3Box1Text} onClick={goToBlue}>
            <span>요즘들어 나의 마음이<br/>
                시들어가는 기분이 든다면,</span>
          </div>
          
          <div className={styles.main3Box1Section2}>       
            <div style={{marginLeft: 30, color: "gray"}}>유저님의 마음을 들여다 볼 자가진단</div>
            <div className={styles.line}></div>
            <div className={styles.Arrow}></div>
            <img src={process.env.PUBLIC_URL + "/imges/main1.png"} alt="" />
          </div>        
        </div>


        <div className={styles.main3Box2} onClick={goToMap}>
          <div className={styles.main3Box2Text}>
            <span>내 집 주변<br />
                  가까운 정신의학과</span>
            <img src={process.env.PUBLIC_URL + "/imges/main2.png"} alt="" />
          </div>
          <div className={styles.main2Text2}>
            <div>찾아보기</div>
            <div className={styles.line2}></div>
            <div className={styles.Arrow2}></div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default Main1