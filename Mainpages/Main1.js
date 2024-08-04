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
    <div className={styles.전체container}>

        {/* 여기가 맨 위 부분 */}
        <div className={styles.mainBox}>

                <div className={styles.mainTitleText}>
                    <p className={styles.왼쪽끄적임}>끄적임</p>
                    <span className={styles.끄적임밑}>
                    시들어가는 나의 마음</span>
                    <span className={styles.끄적임밑2}>
                    따뜻하게 보듬어줄 손길을 찾는다면,
                    </span>
                    </div>

                    <div className={styles.클로버그림컨테이너}>
                        <div className={styles.클로버그림}>
                        <img style={{width:'32px' , height:'32px' ,
                          marginTop: 280 , marginRight : 0 , marginBottom : -20, marginLeft : 300
                        }}
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALPSURBVHgB7Vc9b9RAEJ1DMRIpQIIiFElxFC5IEQooUkDD76ZJc0VScEVSXIGLUCQSV+SQcsVFOubFs2RvY3tmfHaa+Ekr2+vx7tv5NtGAAQOeF0bUI9br9Tu+HPD4w2M+Go2W1BK9EWWSOV/yaOqWx4RK4mMeCx6XTP63Zb1eiDLJV3z5XvFqxSNL5mZMdkYKXlA/eFMzn1XM5eIijeiL6A75kHe6IJ8c8rtUambFJltQN3itCZiJSnAgCLJoDgEyZcLzRNx7gEwTMJmeCX2m0jzpgtDusRwihjcNqfIqUSaxz5f3ihgCYhweWMOI7jnZcakJWDT6gWw4TKL32vgdtKnm0q6j/kgCDoCW7hR5vJ+wBW4VORPRKdl9Dj57bwExf5NJseaJhSRgIbomXxrLpTIBBVVrFW5hJgk0EpUNj8mQPhLcB5YQicsjtAhTn4rGzdA0BTN6SQJ/ww0T+sUHxi0KxCNX4Hdwl7eyD8YNy117iXqBlHTBG93EkyBLm+SQHfao7KQeKUIKyVlc+Rq7JzntN9IPBIKzigpFFQRRHNQmhMpO6weveacSpQeyR8ni+Bhag4mutKCQlPWFbARjnAStqqYXEhPeLPjQqi4QpIpBY+jmpzKHb75Smbq8+J8xzD4q5OoIQlMf6aEP3eW5BX9T4Du+X7YgOosttXVlYhKHVKawtFnOoyqldvAJirTrb00UJKSrGteIwOShSiHITP9GgnHa9W+j0U+kd1XxIc5Jr/0xDuKHVkSl/9RIAlnQjPj4KdmxkeraanTfIbsXbsQFLP6K4LuKJ9xERUOeCN7QvATJRYN86Ac2MkzXJbQKSFU7ocIAUv+hseBC4IFUhIArqvJ0G6KurkfwkpJAkhz5k4xwm15KWle/yWa0DaZzj7CnQa5DK6I10buk6l8WT6Kv35O2gHRWIakXco07LRzozNvNPxmQwuQQAwZsi39HDAKCB0KiPgAAAABJRU5ErkJggg==' alt=''>
                        </img>
                        <img style={{transform: 'scaleX(-1)' , width:'36px' , height:'36px',
                          marginTop: 280 , marginRight : 0 , marginBottom : -40, marginLeft : 0
                        }}
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALPSURBVHgB7Vc9b9RAEJ1DMRIpQIIiFElxFC5IEQooUkDD76ZJc0VScEVSXIGLUCQSV+SQcsVFOubFs2RvY3tmfHaa+Ekr2+vx7tv5NtGAAQOeF0bUI9br9Tu+HPD4w2M+Go2W1BK9EWWSOV/yaOqWx4RK4mMeCx6XTP63Zb1eiDLJV3z5XvFqxSNL5mZMdkYKXlA/eFMzn1XM5eIijeiL6A75kHe6IJ8c8rtUambFJltQN3itCZiJSnAgCLJoDgEyZcLzRNx7gEwTMJmeCX2m0jzpgtDusRwihjcNqfIqUSaxz5f3ihgCYhweWMOI7jnZcakJWDT6gWw4TKL32vgdtKnm0q6j/kgCDoCW7hR5vJ+wBW4VORPRKdl9Dj57bwExf5NJseaJhSRgIbomXxrLpTIBBVVrFW5hJgk0EpUNj8mQPhLcB5YQicsjtAhTn4rGzdA0BTN6SQJ/ww0T+sUHxi0KxCNX4Hdwl7eyD8YNy117iXqBlHTBG93EkyBLm+SQHfao7KQeKUIKyVlc+Rq7JzntN9IPBIKzigpFFQRRHNQmhMpO6weveacSpQeyR8ni+Bhag4mutKCQlPWFbARjnAStqqYXEhPeLPjQqi4QpIpBY+jmpzKHb75Smbq8+J8xzD4q5OoIQlMf6aEP3eW5BX9T4Du+X7YgOosttXVlYhKHVKawtFnOoyqldvAJirTrb00UJKSrGteIwOShSiHITP9GgnHa9W+j0U+kd1XxIc5Jr/0xDuKHVkSl/9RIAlnQjPj4KdmxkeraanTfIbsXbsQFLP6K4LuKJ9xERUOeCN7QvATJRYN86Ac2MkzXJbQKSFU7ocIAUv+hseBC4IFUhIArqvJ0G6KurkfwkpJAkhz5k4xwm15KWle/yWa0DaZzj7CnQa5DK6I10buk6l8WT6Kv35O2gHRWIakXco07LRzozNvNPxmQwuQQAwZsi39HDAKCB0KiPgAAAABJRU5ErkJggg==' alt=''>
                        </img>
                        </div> 
                        <div 
                        // style={{marginBottom: 80}}
                        >
                        <span className={styles.오른쪽끄적임}>끄적임</span></div>
                        </div>
                    </div>
    {/*여기부터 중간==================================================================================================== */}

    <div className={styles.main2Container}>
        <div className={styles.main2Text}>
        <img style={{marginTop:-10}} 
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVYSURBVHgB7ZpNTNxGFMffzNjrXdqwrbZVSBQOQRWHcIBDeuASKcqlt0o90A+h9gbnVpWgUBRTEeiXqNTbIrVVpaSNOPbUWyUuHJoDORCpVGFpoLArSsg6sMuu7Zl6Npgsxmbt8XrJwb/bjj/w3zN+7//eABATExMTExMTExMTIwKCM0L9Q5VS/7IOU0JtjFaL4x9MF+xj0z9/lqEJ5TJmpiwbiTxJPs5/MvBdGZrAmQienZ9NVQytn2Fos8cQhRLTK/eTqddLB1S7ceKiSmVl7KOZFQgJhjOgSve668Vyar8Vpf/A3L3qepGidFsz3w0hablgPrsUaKfnCYikPY9Zor+6ffMShKDlgo19LQ0hMGTWAyFouWDWnpIgBIhhmQc1EKTlgs29J6GjrZki7SBIywVnDnY0CAmhkgyCtFzw8PCcDtTcgRCY2NBBkKYJ5kZCzQ61+TkXMVKAEBhVIvzCQhkPLjLxqNIFspQBTJ4HEmsGCcXrI4OTG27XZbND8uNzF29YuTdwAMMItNF31QUQRFjw97dvtu9jdNVpII7d/NA9WQ7pxIxM31W5iQhsJFhK/nP87XHhFSK0pLl5KCHcf5pYju2e3BxSpriZs16IAUHAsBpG7LNbCMB9MCXMf6S0HNK38+qV+iEevKwXsur3FozR8tru5t8QksCCv/5J7Wg0s25UKXR9eXeit36MzzIX0uhafo6u5RfneIQPSWDBVDGFXQ4F0lm/vPkso6q+dNo1tlh1eK4ETSBw0Lp1R+1DBEIZeLNqLE98OJWzf6t3RrsSJHnFeR5FumY82b7nJfYwS6QJSaRq9zWrZbcAWU9gwVO/jndiJPdCCBiielVHi5ODk0euyxm1MeD11eLGA+cy5iLb1uA1QzGtBoHU7owlPDNQqC7XNxSOHQcBRFOK88EqF2BBva4a9fe1xrsMyfhrYuD5CuDYOR9Lycu+Amalsug220KVS/U8rCpbcEkkeNlQRJF6/YtjaWnsPZV3NE50NXh1hLaglylKGwUGvpAlPiGLzmEhwckC7qGYCou1A1Gj82p9rzz0mQg6fMo8Akkk5TYeOEo37Fg0wG/U5U7OWkXXuFgQwDTBtSoLPMMVXbsABIRAhllY2y8sNcqnXOwzJ8fEy0AlkXMbD9V98Au3kBVpf0kd/Cbf6NyabdWfBnNyTiwHN/bOmGt6CiwY7ZV3WDrl71xLKLePuaebOeeszvww2mXIEqvPx5ySqfVgAuJiLUiVeTYZhNLS1I/jnSQp93iWdwQXwaSFteJJobX0smW+aZeTCeuFfDqgPjg6nlXblHNwTaR0rMd5Xxvh8pA/mNSuZzBRaq6LAS1jHTSWShS9lpNbA97t4WpNOqvKgpBY6fP3+jzPadnOgx2IvL5Np91shrlxE9ySnlYjsbUHUXD37PzHR8HBy4T4hXdGnGJr4xAxdrOgUdTl/eYD4+W++rEwog2qu6alSAXb36zvFGMFMmeTXUQ0Nzefv39r3fVPQIS4bZo1AsnKiUqMi6ZMvx+kWeB1PDLBohaUvyC3rRQ+Y7qGF5kJrp3Qw/7Yyj9afuE02xqZ0+KzC6J4VDrqsMqFLA1lh5bfePVixqBQ23Ihcqr08L+HBT8toMjS0swv6lthzINbSmkGkSxpbkrCOiWybQhXZKdxJv8B4Aes01D7yJ73hQjg31rgJrsDJCf9VSgBiWyGKYOGpeBZEJlgslfOgQB2elnb3bgHERBp8RCoAMB4h5qVjUfadr4ZOwxeRF4teYnmjkg+wMtmCneyhOTZoWg2LSkPR7Ij6VfSL3VbNfN5/rvZ2ycvNOpvqnB7NyYmJuZ/AEGZuEmPKnoAAAAASUVORK5CYII=' alt=''>
        </img>
            <div className={styles.오늘끄적임}>
                <span className={styles.오늘끄적임22}>오늘 하루도 수고한 당신에게,</span>
                <span>끄적임이 건네는 다정함 한 스푼</span>
            </div>
        </div>

        <div className={styles.main2InBox}>
          <p>적어도 나는 네 덕분에 행복해졌다고, 말해주고 싶었어.</p>
        </div>

    {/*여기부터 바닥==================================================================================================== */}
    <div className={styles.바닥부분}>
        

     {/* 왼쪽    */}
    <div className={styles.main3Box1} onClick={goToBlue}>
            
    <div className={styles.텍스트와화살표}>
            <div className={styles.유저님의마음을}>
            <span>요즘들어 나의 마음이</span>
            <span>시들어가는 기분이 든다면,</span>
            </div>

          <div className={styles.유저님의마음을22}>
            <div style={{marginRight:1 , width:'240px' , fontSize:15}}>유저님의 마음을 들여다 볼 자가진단</div>
            <div>
            <div className={styles.line}></div>
            <p className={styles.검사바로}>검사 바로가기</p>
            </div>
            <div className={styles.Arrow}></div>
            
          </div>
    </div>
            <img src={process.env.PUBLIC_URL + "/imges/main1.png"} alt="" className={styles.이미지11}
            />
                    
    </div>


    {/* 오른쪽 */}
      <div className={styles.main3Box2} onClick={goToMap}>

          <div className={styles.main3Box2Text}>
            <span style={{color:'#4d4d4d' ,fontSize:22 , fontWeight:600, marginLeft:50 , marginRight:100 }}>내 집 주변</span>  
            <img src={process.env.PUBLIC_URL + "/imges/main2.png"} alt="" className={styles.이미지22}/>
          </div>

          <div className={styles.main2Text2}>
            <span style={{color:'#4d4d4d' ,fontSize:22 , fontWeight:600 , marginLeft:50}}>가까운 정신의학과</span>
            <div className={styles.아래쪽}>
                <p style={{color:'#4d4d4d' ,fontSize:22 , fontWeight:600 , marginLeft:50}}>찾아보기</p>
                
                <div>
                <div className={styles.line2}></div>
                <div className={styles.바로바로22}>검색하러 가기</div>
                </div>
                
                <div className={styles.Arrow2}></div>
          </div>
        </div>
        
    </div>



    </div>
    


    </div>
    
    </div>
  )
}

export default Main1