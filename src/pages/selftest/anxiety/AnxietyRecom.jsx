import React,{useEffect,useState} from 'react'
import styles from './Anxiety.module.css';
import { jwtDecode } from 'jwt-decode';

export default function AnxietyRecom({sum}) {

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

const lv1 = sum < 10
const lv2 = sum <=25 && sum > 10
const lv3 = sum <=40 && sum > 25
const lv4 = sum > 40
    
  return (
    <div>
      
    
      {lv1 && (
    <>
      <div className={styles.recommendBox}>
        <p>'{post}'님을 위한 추천영상</p>
        <div className={styles.recomendVideo}>
          <div className={styles.recomendVideoBox}>
            
            <img src='https://img.youtube.com/vi/9XyqXf3kNMM/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=9XyqXf3kNMM', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/XTHkgcb9GYA/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=XTHkgcb9GYA', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/9XyqXf3kNMM/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=9XyqXf3kNMM', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/nDTTjoSAD1k/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=nDTTjoSAD1k', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/7XCx1XcVP5w/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=7XCx1XcVP5w', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/K5EVhkbcsEo/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=K5EVhkbcsEo', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
            
            <img src='https://img.youtube.com/vi/A2FjPz4ILhw/sddefault.jpg' 
            onClick={() => window.open('https://www.youtube.com/watch?v=A2FjPz4ILhw', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
           
          </div>
          <div className={styles.recomendVideoBox}>
          
          <img src='https://img.youtube.com/vi/Es0VRseBjBY/sddefault.jpg'
          onClick={() => window.open('https://www.youtube.com/watch?v=Es0VRseBjBY', '_blank')} alt='' style={{width:'300px' , height:'200px'}}></img>
         
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
