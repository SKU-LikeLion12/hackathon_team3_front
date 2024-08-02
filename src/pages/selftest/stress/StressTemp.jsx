import React from 'react'
import styles from './Stress.module.css';

export default function StressTemp({sum}) {
   
    const lv1 = sum < 5
    const lv2 = sum <=10 && sum > 5
    const lv3 = sum <=15 && sum > 10
    const lv4 = sum <=20 && sum > 15
    const lv5 = sum > 21
   
    return (
        <div>
            {lv1 && (
                <div className={styles.resultBox}>
                    <div className={styles.resultText}>
                        <p>'유저'님의 검사 결과</p>
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
                            현재 '유저'님은 <span className={styles.resultHighlight}>{sum}</span>으로 
                            경도의 스트레스 상태입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            스트레스를 줄이고 긍정적인 경험을 하는 등 <br />
                            <span>스트레스 관리가 필요합니다.🌞 </span>
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
                        <p>'유저'님의 검사 결과</p>
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
                            현재 '유저'님은 <span className={styles.resultHighlight}>{sum}</span>으로 
                            경도의 스트레스 상태입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            스트레스를 줄이고 긍정적인 경험을 하는 등 <br />
                            <span>스트레스 관리가 필요합니다.🌞 </span>
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
                        <p>'유저'님의 검사 결과</p>
                    </div>
                    <div>
                        <div className={styles.resultScoreLine3}>
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" />
                        </div>
                        <br />
                        <p className={styles.scoreText}>
                            <span>0</span> <span>5</span> <span>10</span> <span>15</span> <span>20</span>
                        </p>
                    </div>
                    <div className={styles.resultIntro}>
                        <p>
                            현재 '유저'님은 <span className={styles.resultHighlight}>{sum}</span>으로 
                            경도의 스트레스 상태입니다.  
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            스트레스를 줄이고 긍정적인 경험을 하는 등 <br />
                            <span>스트레스 관리가 필요합니다.🌞 </span>
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
                        <p>'유저'님의 검사 결과</p>
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
                            현재 '유저'님은 <span className={styles.resultHighlight}>{sum}</span>으로 
                            중등도의 스트레스 상태입니다.   
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            지속적인 스트레스는 기타 정신적인 어려움으로 이어질 수 있으므로, <br />
                            <span>적극적으로 스트레스 관리를 하는 것이 필요합니다. 🌟 </span>
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
                        <p>'유저'님의 검사 결과</p>
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
                            현재 '유저'님은 <span className={styles.resultHighlight}>{sum}</span>으로 
                            심한 스트레스 상태입니다. 
                            <img src={process.env.PUBLIC_URL + "/imges/cloud.png"} alt="" /> <br />
                            적극적인 스트레스 관리가 필요하며 혼자서 해결하기 어려울 수 있으므로 <br />
                            <span>전문가의 도움을 적극적으로 받으시기 바랍니다.💉
                            </span>
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
