import React,{useEffect,useState} from 'react'
import styles from './Blue.module.css';
import { jwtDecode } from 'jwt-decode';

export default function BlueRecom({sum}) {

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
            
            <img src='https://img.youtube.com/vi/zU81s9OF31M/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=zU81s9OF31M', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/jrHSX15T0X0/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/shorts/jrHSX15T0X0', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/ziGnBQ6bkr4
/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/shorts/ziGnBQ6bkr4', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/BAEEboQ3V2Y
/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=BAEEboQ3V2Y', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/i8He4ytu5tQ
/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=i8He4ytu5tQ', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/0u5zfUKvIXM/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=0u5zfUKvIXM', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/rErdbqGmsD4/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/shorts/rErdbqGmsD4', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/oKR5koNhyzg/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=oKR5koNhyzg', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/WYmnqBaWtW0
/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=WYmnqBaWtW0', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/gmdNrtQVBgc/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=gmdNrtQVBgc', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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