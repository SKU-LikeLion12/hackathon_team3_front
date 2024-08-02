import styles from './Anxiety.module.css'
import React,{useEffect , useState} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function AnxietyTest({sum}) {

    const [isLogined, setIsLogined] = useState(false);
    const [role, setRole] = useState(null);
    const [post ,setPost] = useState(null); //유저 닉

    const Navigate = useNavigate();
    const goToMap=()=>{
        Navigate('/hospital_map')
    }

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
        <div onClick={goToMap}>
            {lv1 && (
                <div className={styles.resultBox}>
                    <div className={styles.resultText}>
                        <p>'{post}'님의 검사 결과</p>
                    </div>
                    <div>
                        <div className={styles.resultScoreLine1}>
                            <img src={process.env.PUBLIC_URL + "/imges/clover.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                            <span>0</span> <span>10</span> <span>20</span> <span>30</span> <span>40</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            현재 불안하지 않은 상태입니다.👒  
                            <img src={process.env.PUBLIC_URL + "/imges/cloudcloud.png"} alt="" /> <br />
                        </p>
                    </div>
                    <div className={styles.resultLink}>
                        <p>주변 정신과 의료기관 찾기</p>
                        <div className={styles.plusline}></div>
                        <div className={styles.resultArrow2}></div>
                    </div>
                </div>
            )}

            {lv2 && (
                <div className={styles.resultBox}>
                    {/* lv2에 대한 내용 */}
                    <div className={styles.resultText}>
                        <p>'{post}'님의 검사 결과</p>
                    </div>
                    <div>
                        <div className={styles.resultScoreLine2}>
                            <img src={process.env.PUBLIC_URL + "/imges/clover.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                        <span>0</span> <span>10</span> <span>20</span> <span>30</span> <span>40</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            가벼운 불안 상태에 있어 보입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            <span>불안을 전환할 수 있는 활동을 하는 것을 추천드립니다.🎸 </span>
                        </p>
                    </div>
                    <div className={styles.resultLink}>
                        <p>주변 정신과 의료기관 찾기</p>
                        <div className={styles.plusline}></div>
                        <div className={styles.resultArrow2}></div>
                    </div>
                </div>
            )}

            {lv3 && (
                <div className={styles.resultBox}>
                    {/* lv3에 대한 내용 */}
                    <div className={styles.resultText}>
                        <p>'{post}'님의 검사 결과</p>
                    </div>
                    <div>
                        <div className={styles.resultScoreLine3}>
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                        <span>0</span> <span>10</span> <span>20</span> <span>30</span> <span>40</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            상당한 정도의 불안 상태로 나타납니다.   
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            이를 극복하기 위한 노력이 필요하다고 여겨집니다. <br />
                            <span>해당 상태가 두어달 이상 지속된 경우, 전문가의 도움을 받아보세요.💉  </span>
                        </p>
                    </div>
                    <div className={styles.resultLink}>
                        <p>주변 정신과 의료기관 찾기</p>
                        <div className={styles.plusline}></div>
                        <div className={styles.resultArrow2}></div>
                    </div>
                </div>
            )}

            {lv4 && (
                <div className={styles.resultBox}>
                    {/* lv4에 대한 내용 */}
                    <div className={styles.resultText}>
                        <p>'{post}'님의 검사 결과</p>
                    </div>
                    <div>
                        <div className={styles.resultScoreLine4}>
                            <img src={process.env.PUBLIC_URL + "/imges/pol.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                        <span>0</span> <span>10</span> <span>20</span> <span>30</span> <span>40</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            심각한 불안 상태에 있어 보입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            <span>가능한 한 빨리 전문가의 도움을 받으십시오.🚑 </span>
                        </p>
                    </div>
                    <div className={styles.resultLink}>
                        <p>주변 정신과 의료기관 찾기</p>
                        <div className={styles.plusline}></div>
                        <div className={styles.resultArrow2}></div>
                    </div>
                </div>
            )}

            
        </div>
    );
}
