import React,{useEffect,useState} from 'react'
import styles from './Stress.module.css';
import { jwtDecode } from 'jwt-decode';

export default function StressRecom({sum}) {

    const [isLogined, setIsLogined] = useState(false);
    const [role, setRole] = useState(null);
    const [post ,setPost] = useState(null); //유저 닉

    //로그인 유지 부분
    useEffect(() => {
        const memberToken = localStorage.getItem('memberToken');
        if (memberToken) {
          try {
            const decodedmemberToken = jwtDecode(memberToken);
            console.log('Decoded Member Token:', decodedmemberToken);
            setRole(decodedmemberToken.role);
            setPost(decodedmemberToken.sub)
            setIsLogined(true);
          } catch (error) {
            console.error('토큰 해독 실패', error);
            setIsLogined(false);
          }
        } else {
          setIsLogined(false);
        }
      }, []);
    
// ===============================================================================

    const lv1 = sum < 5
    const lv2 = sum <=10 && sum > 5
    const lv3 = sum <=15 && sum > 10
    const lv4 = sum <=20 && sum > 15
    const lv5 = sum > 21
   

  return (
    <div>
       {lv1 && (
    <>
      <div className={styles.recommendBox}>
        <p>'{post}'님을 위한 추천영상</p>
        <div className={styles.recomendVideo}>
          <div className={styles.recomendVideoBox}>
            
            <img src='https://img.youtube.com/vi/38A3lnTd4Hc/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/shorts/38A3lnTd4Hc', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/Fs0qitF-qWM/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=Fs0qitF-qWM', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
          </div>
        </div>
      </div>

      <div className={styles.recommendBox}>
            <p>{post}님을 위한 추천활동</p>
            <div className={styles.recommendActive}>
                <div> 
                </div>
                <div>
                  <img src={process.env.PUBLIC_URL + "/imges/cicle.png"} alt="" /> <br/>
                  <span>자전거 타기</span>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    </>
  )}

{lv2 && (
    <>
      <div className={styles.recommendBox}>
        <p>'{post}'님을 위한 추천영상</p>
        <div className={styles.recomendVideo}>
        <div className={styles.recomendVideoBox}>
            
            <img src='https://img.youtube.com/vi/sEam0Ptr0as/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/shorts/sEam0Ptr0as', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/2YHbYdjNKfI/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=2YHbYdjNKfI', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
          </div>
        </div>
      </div>

      <div className={styles.recommendBox}>
            <p>{post}님을 위한 추천활동</p>
            <div className={styles.recommendActive}>
            <div> </div>
                <div>
                  <img src={process.env.PUBLIC_URL + "/imges/cicle.png"} alt="" /> <br/>
                  <span>자전거 타기</span>
                </div>
               
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/books.png"} alt="" style={{width: 110}}/><br />
                    <span>독서하기</span>
                </div>
                <div> </div>
               
            </div>
        </div>
    </>
  )}

{lv3 && (
    <>
      <div className={styles.recommendBox}>
        <p>'{post}'님을 위한 추천영상</p>
        <div className={styles.recomendVideo}>
        <div className={styles.recomendVideoBox}>
            
            <img src='https://img.youtube.com/vi/EKo_UWFphVg/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=EKo_UWFphVg', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/yLhatSyGG34/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/shorts/yLhatSyGG34', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
          </div>
        </div>
      </div>

      <div className={styles.recommendBox}>
            <p>{post}님을 위한 추천활동</p>
            <div className={styles.recommendActive}>
            <div> </div>
                <div>
                  <img src={process.env.PUBLIC_URL + "/imges/cicle.png"} alt="" /> <br/>
                  <span>자전거 타기</span>
                </div>
               
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/books.png"} alt="" style={{width: 110}}/><br />
                    <span>독서하기</span>
                </div>
                <div> </div>
               
            
            </div>
        </div>
    </>
  )}

{lv4 && (
    <>
      <div className={styles.recommendBox}>
        <p>'{post}'님을 위한 추천영상</p>
        <div className={styles.recomendVideo}>
        <div className={styles.recomendVideoBox}>
            
            <img src='https://img.youtube.com/vi/_E4dthXGvjE/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=_E4dthXGvjE', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/WoVNidsqFdo/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=WoVNidsqFdo', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
          </div>
        </div>
      </div>

      <div className={styles.recommendBox}>
            <p>{post}님을 위한 추천활동</p>
            <div className={styles.recommendActive}>
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/cicle.png"} alt="" /> <br/>
                    <span>자전거 타기</span>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/books.png"} alt="" style={{width: 110}}/><br />
                    <span>독서하기</span>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/yoga.png"} alt="" /><br/>
                    <span>명상하기</span>
                </div>
            </div>
        </div>
    </>
  )}

{lv5 && (
    <>
      <div className={styles.recommendBox}>
        <p>'{post}'님을 위한 추천영상</p>
        <div className={styles.recomendVideo}>
        <div className={styles.recomendVideoBox}>
            
            <img src='https://img.youtube.com/vi/9b_zBrxCJRY/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=WoVNidsqFdo', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/WoVNidsqFdo/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=RKp8MN1aH24', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
          </div>
        </div>
      </div>

      <div className={styles.recommendBox}>
            <p>{post}님을 위한 추천활동</p>
            <div className={styles.recommendActive}>
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/cicle.png"} alt="" /> <br/>
                    <span>자전거 타기</span>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/books.png"} alt="" style={{width: 110}}/><br />
                    <span>독서하기</span>
                </div>
                <div>
                    <img src={process.env.PUBLIC_URL + "/imges/yoga.png"} alt="" /><br/>
                    <span>명상하기</span>
                </div>
            </div>
        </div>
    </>
  )}
</div>
  )
}
