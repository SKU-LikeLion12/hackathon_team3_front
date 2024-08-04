import React,{useEffect , useState} from 'react';
import styles from './Blue.module.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function BlueTest ({ sum , onClick }) {

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
    
    const lv1 = sum < 5
    const lv2 = sum <=10 && sum > 5
    const lv3 = sum <=15 && sum > 10
    const lv4 = sum <=20 && sum > 15
    const lv5 = sum > 21
   
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
                            <span>0</span> <span>5</span> <span>10</span> <span>15</span> <span>20</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            일상에서 겪을 수 있는 감정입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            기분이 나아질 수 있도록 활동을 통해 일상의 특별함을 만들고, <br />
                            <span>전환할 수 있는 시간을 가져보세요..🌈 </span>
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
                            <span>0</span> <span>5</span> <span>10</span> <span>15</span> <span>20</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            일상에서 겪을 수 있는 감정입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            기분이 나아질 수 있도록 활동을 통해 일상의 특별함을 만들고, <br />
                            <span>전환할 수 있는 시간을 가져보세요..🌈 </span>
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
                            <img src={process.env.PUBLIC_URL + "/imges/clover.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                            <span>0</span> <span>5</span> <span>10</span> <span>15</span> <span>20</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            일상에서 겪을 수 있는 감정입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            기분이 나아질 수 있도록 활동을 통해 일상의 특별함을 만들고, <br />
                            <span>전환할 수 있는 시간을 가져보세요..🌈 </span>
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
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                            <span>0</span> <span>5</span> <span>10</span> <span>15</span> <span>20</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            살짝 기분이 다운되어있습니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            현재 심각하게 우울한 상태는 아니지만, 이러한 기분이 지속되거나 <br />
                            <span>더 악화된다면, 전문적인 도움을 받아보시길 권장드립니다.🌟 </span>
                        </p>
                    </div>
                    <div className={styles.resultLink}>
                        <p>주변 정신과 의료기관 찾기</p>
                        <div className={styles.plusline}></div>
                        <div className={styles.resultArrow2}></div>
                    </div>
                </div>
            )}

            {lv5 && (
                <div className={styles.resultBox}>
                    {/* lv5에 대한 내용 */}
                    <div className={styles.resultText}>
                        <p>'{post}'님의 검사 결과</p>
                    </div>
                    <div>
                        <div className={styles.resultScoreLine5}>
                            <img src={process.env.PUBLIC_URL + "/imges/pol.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                            <span>0</span> <span>5</span> <span>10</span> <span>15</span> <span>20</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 <span className={styles.resultHighlight}>'{post}'</span>님은 <span className={styles.resultHighlight}>{sum}점</span>으로 
                            <span className={styles.resultHighlight}>'우울증'</span>이 의심되는 단계입니다. 
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            <span>'우울증'</span>은 마음의 감기라고도 불립니다. <br />
                            <span>주변 의료기관을 방문해 보시는 것을 추천드립니다.</span>
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

{/* <div className={styles.resultContainer}>
<h1>결과 보기</h1>
<div className={styles.resultContent}>
    {buttonStates.map((buttons, questionIndex) => {
        // 선택된 버튼 찾기
        const selectedButton = buttons.find(button => button.active);
        return (
            <div key={questionIndex} className={styles.questionResult}>
                <h2>문제 번호: {questionIndex + 1}</h2>
                <p>
                    {selectedButton ? `선택한 값: ${selectedButton.value}` : '선택 안됨'}
                </p>
            </div>
        );
    })}
    <div className={styles.totalSum}>
        <h2>총합</h2>
        <p>{sum}</p>
    </div>
</div>
</div> */}