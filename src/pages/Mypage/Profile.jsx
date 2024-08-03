import React, { useEffect, useState } from 'react';
import styles from './Mypage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default function Profile() {
    //링크 이동
    const navigate = useNavigate();
    const goToBlue = () => {navigate('/blue');};
    const goToStress = () => {navigate('/StressTest');};
    const goToAnxiety = () => {navigate('/anxiety');};
    const goToPost = () => {navigate('/mypost');};
    const goToComment = () => {navigate('/mycomment');};
    const goToBookmark = () => {navigate('/mybookmark');};

    //아이콘 이미지들
    const iconImages = [
        {
            default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHISURBVHgBtVVNa8JAEN18KcYYqJq2gfZSxIuHFkoP/v9DLz3UQ3vw4qFC7SGBfJAPjdo3QUtId+Mi+CBkszPz9s3szoYxedjdbvdG1lmXdez3+5PNZkPDHxl/lV0IdeIOcMdzzPN8oev6J892iOlU57TqB9J1EfxkGAZbr9de1YYyxFmW5XXS4XA41jRtYppmlKZpyCUmg2VZTFGUMZ6kKIqQNYCUEin85kEQLISKCUmSeFg9xQJ+HMflbvV6vYGqqrcgum6325RNSvOO4xTb7TaskxIU1gwdpC8oz6A6udvtViB7x7AQBWqsAbZtP4PUqc+jTBb24QrKl6JY4XGj9FE/YUNQFuQjtFM3oX4P9AEVH77vHzdMGPSnSlVtvMrTU+fRW61WhtRKRyg08QoPQcUpYtTaOI7rPMLNozSR7pQ1AMfsNYoij2cT1pgCoMBjYrUrEWkjMQH1fkNJ/l06tOBoNJo1xXJLQR2FLiQ1ZSMcdp+apIDSoKKU7pYBfJcnian30U3U0jMo/mINwN1yv9/vH6mlsdi8atPqSkW9z4P03eK6rkkqBDzCPwjFUCw7BwieotZTWf+L/UE0WUc6EWjVb95lz8Mv1XO5ouoQx6gAAAAASUVORK5CYII=', 
            active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFfSURBVHgBtVW7UcQwEF1xFzi0XcGVcCWIjPDowFTAUMFdB0AFEJIdVHCig6MDkxGKyM7M22E9Y2sseS/wzmgk7ef57XolESklz/Mtxk7rv9Y6GmMeu64zWL5r/K9oIVkNN0h1k2XZrm3bc+gI/S+mN9h+QhviKtg9bH7yK+xQFEWHeU9KKctyLzHVnONB5Tgmcghtq1DRNI1DWt9Yuj41BFouEcYNBkFfs57Tx/TlvX8KcQylGeWYjugIO9SjO7gz7gDoY7HJrgDgSwgqeu7nYzKW4mwtAE6UEDC/Bmk3ZVvLabqX/QMc+1azNC9bDCdERjhcitqIYL0ZBHkFcD5Yj3AWK0X050mAo7h8xECTwMLolgEmTJ+wVanYyVLIqXNgVMve0v/P5Lqfe6Z8t7Ae+1eaE/XZpwvultTZTxCZv1s4tZhD6gXhGCnL5QJWJwQ7rf9iL4j6zUN7PWOqtf5/ARSJ9DhGqLEAAAAASUVORK5CYII=',
        },
        {
            default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGcSURBVHgBrVRda4JQGD7qOZlWk6xtCcUoWIx1sYvY/7/f/brwog0WxBBrlnQwrfa8A8NVK1k9IMf36/H9OmrsBGzbvsJxLYS4MgxDLJdLecxf+ctgWVZns9nca5omsvr1er0AqSulHB2K0w4p6/V6F8eDqqp7dkVRBOe8oet6HEXR165dPcBnrFarLjsBfKxHvicJUarDcqJSqbR2ddmSeLFYvEPzWyhLZzmALDlxJEkS4UxI9zMU6lmeMo8BpO58Pnc1rEITk+yxM4Fsa6jOV0ulUoNdCCBtq9grwS4E9N6kKc/Y5TBTsaBvYE7YmSAOzMPVwjCMsS4e6r/BVftX+YiViH3xPC/8dZer1aqFLzVhbKO3AzwBJmdCfoJ+GMfxJ/lB94w18aEflstlOR6PF1vyLOF0Og2wj7dwHAVBMMRe+SC1KYPJZDIgGS2qwc6xHa8kZ8n2CGknEWxSLzIZt0Dgpi7407Qp212iFDwrFAqFLmWXOiPwEY/0ff+DZPwbO9R8+L2zPKAl7/f728Hg8tccxzFTmd5Jd4zjGxsDr9Tbef1dAAAAAElFTkSuQmCC',
            active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFGSURBVHgBrVQxUsMwEDwpjamwXdERfhB+AD/wD3BJR3gBpKOEFzg/gB+Qko7kBVGZLkrnztnNKDOK47GVxDsjS3u6O61uTlbSgTiOR5hGjhpr7azNX7UkGiul3risbZmqqiZIPG2KGzQZ0zRlog+MqOksHJRFUbQpy/JPuhRC2RABSwkAlN5BqfFtusEvk3DkdcPAUxbjGs9Q9wR6IwGAL2OuMFa4vt3Z+GHNIP9dLgDjcf2JgrAcJxXSA5D0kTU8pWatgLCxxuda+sOthsyF9ASImyvXd/9y/CJOhYW4e83GZDFhMHI+djmY6+Cl8Eegtc6x+YLxCtMcgzcowL+w/qEf+DemmbOZ+ms5QJIkS/Rl4R0ypW3P2bPgFUslXWBP+s5U7Hju+BB8jflTQlBXB/7rq2Mi8iB1LiDjm/b4gx/MNW1tObZFAXkTntYl9AAAAABJRU5ErkJggg==',
        },
        {
            default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGmSURBVHgBnVRNa8JAEN0ku9gY3KgRolBBc/DSHgr2Uuipf95LPRSq9NQcLNSLglWMSfzom1SL6MaPPAhJJjNv3nxsDHYavFAolAzDcEzTFFEUBWf8mXbim7Rt+1HX9fzOsF6v55PJpIPHVGIjxW5KKZ+h7EbTNB9E37CFIHdyuVw1DMMB8asCucpYLBZbIBIg6kGR/y9ZSoEkLpTX9+370JVZOBd0PwxarVakjCGZzVKgVCiE6KOsIwVQnPij9IilQNnD2WwWKyZqWpb1QK1YLpcf9L1Wq+Wh2t3fAA1OLjJ67ATQAlKWlAnCz/F43K9UKi2QtXY+SDKaTqcdDkIrjmOHnQGtDG7+tq+CyCAkAJGPJLfI6WBYTY1lBBae1JGqEZ4dED5tNpuvhLBcLkuoFCwjMMQqyJpQ+sZBdkcvf23KBsTT5INGozHkJBPXVerobKOnJpGglyPE/3ieN+h2u/E1PaQSKHGyLovF4gWkQwzp9dDpIuA43kORGwRBD0tvb5XOD/2MSwkRTFcdva7itUTl4kfxToeAZQWVSuuCffPa7bay778WfL2cWyDRVwAAAABJRU5ErkJggg==',
            active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFESURBVHgBpZSNUYNAEEbvGAoAKqADsQJJBUkH0QqCFZgSoAJjBbEDsQItARsArADfxmWGieHnzDdzuWVz927Z3cOaCQWIKWHEjKpt29LMyE7AEmvtUWG9qq7rVoArJyCwGNiHmAAKAXmel2BvFXoLtDVLBfAQhmEXRVE29OM7ip//s7G93hhTfuq6zodOIntR88Y4AjPJ1dhB6Htk33hR/pB+8/qGGWthSvHxnJpBB/g4N8y7KRigvn3ktQvZTH6fsPeDA0v8K19OZENq5vXFurxpmlz6U2FS8QL/VhhTxZoVEe4BpBpdqtV/tuqQ1wnM/7UmQinkgwWW87Az1+vU8JLDA4ZTdARwZ/R+s/ed+VM4rrcn0DY5tZDkjPF6vs43yyWpWQN7NHpTiK46X+TS2Bv9+vS6+OVZDFRozHTPkFxdzNkPT6qPTh0VWH4AAAAASUVORK5CYII=',
        },
        {
            default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFeSURBVHgBnZQ7a4RAFIXHJyjrA4QNBIIoxDpFmjT791NJUlskRZa4zSKrIRqfORfMYsTdUU/hjDPj5507Z67AOLJte9e2rdZ1XVpV1aEoigOG86m1Eg+m6/qtIAgbURR1RVG2mqb5MlSWZYLpdrhWZHyl4wFAfcuyduhqi2BN00xuiSIF8GkI5MKwnfLSHAENw3iYDeMJ6XMAdGbBkHCL8RXMgkEmbwFFRw0PRv5y2Axhq9ZVGAwbsJmq61q7BjNh1ju2QJdgJjz0yBYIecvl8SAgPvJ0Dw8pbIGyLDudYb1XAkBmJXwo5OtIjUyRoCrc9Me7Srire2qpAHhUYthKISX7JEk+qC/i6r2ylUJKctyQ6O9dAiyXJClFhFu24K4SSFXV5ziOv88weqCCfsGgn9iujrA3PBD89+Z53ksURT//xscL6VQRKZmVTGv2H9doTojm6LruexiG1dRPfgGbAm3rAFFizgAAAABJRU5ErkJggg==',
            active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEtSURBVHgBnVTLccIwFHxSOPgod6AOQjpwbrmlhIQO0gGhAqAC6ACoAKgAqABV4NHRJ5tdGGY8YGzJO/MsS3qzWul9lHQgTdMDBltV1RHjBrb23rsmXy3d8DCjlMpgU9jZGDOFmWgyKDo9roHwD3YAn40iA9yLdQvCbZ0w9JqvYGGLGLJW8C2hLgslGwb4jIPIcPJ7gA/VGdXmxMdlKkgAEPXPLmX/Eg6rW1QNoepHIqBbiFYSB6cbiJjdW7nlUAyOgxpJhmHMyEgk8Ph7FL8fUAnm331Ialjyo9BiGHorPQERyzzPR/zXkDiS/nBlWU7uk7eiKFySJCec8IV5EkPERK03yms0sbDGxofcOmkn4Dun/2PHfSonRlVr/QtnFvi9LtmGqH6Ha80YuaZDLlJPZwkBcZCZAAAAAElFTkSuQmCC',
        },
    ];

    // 기분 상태 (아이콘 선택 부분)
    const [activeIconIndex, setActiveIconIndex] = useState(null);
    const clickIcon = (index) => {console.log(`선택된 아이콘: ${index}`);setActiveIconIndex(index);};

    // 로그인 유지
    const [isLogined, setIsLogined] = useState(false);
    const [role, setRole] = useState(null);
        
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        setIsLogined(loggedIn);
    }, []);
    
    useEffect(() => {
        const memberToken = localStorage.getItem('memberToken');
        if (memberToken) {
        try {
            const decodedmemberToken = jwtDecode(memberToken);
            setRole(decodedmemberToken.role);
            setIsLogined(true); // 로그인 상태 업데이트
        } catch (error) {
            console.error('토큰 해독 실패', error);
            setIsLogined(false);
        }
        } else {
        setIsLogined(false);
        }
    }, []);

    //프로필 회원정보가져오기

  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProfile = async (id) => {
    const memberToken = localStorage.getItem('memberToken');
    if (!id) {
      setError('사용자 ID가 제공되지 않았습니다.');
      setLoading(false);
      return;
    }
    
    const url = `http://52.78.131.56:8080/member/${id}`; // URL 확인
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${memberToken}`
        }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      setError('데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('ID from useParams:', id); // URL 파라미터 확인
  
    if (isLogined && id) {
      fetchProfile(id);
    } else if (!isLogined) {
      setError('로그인 정보가 없습니다.');
      setLoading(false);
    }
  }, [isLogined, id]);


    return (
        <div className={styles.Profile_container}>
            {/* 상단 부분 */}
            <div className={styles.Profile_top}>
                {/* 젤 왼쪽 */}
                <div className={styles.Profile_top01}>
                    <img className={styles.Profile_img} src='../img/profile.jpg' alt='' />
                    <label htmlFor="fileUpload" className={styles.Profile_top01_p}>
                        프로필 사진 변경하기
                        <input id="fileUpload" type="file" accept=".jpg, .jpeg, .png" />
                    </label>
                </div>

                {/* 중간 부분 */}
                <div className={styles.Profile_top02}>
                    <p className={styles.Profile_top02_p1}>{profile.nickname}</p>
                    <p className={styles.Profile_top02_p2}>닉네임 변경하기</p>
                </div>

                 {/* 젤 오른쪽 */}
            <div className={styles.Profile_top03}>
            <p className={styles.Profile_top03_p}>마음의 날씨</p>

                  {iconImages.map((icon, index) => 
                  (
                
                        <span key={index} onClick={() => clickIcon(index)}>
                            <img 
                                className={styles.Profile_top03_img} 
                                src={activeIconIndex === index ? icon.active : icon.default} 
                                alt={`Icon ${index}`}
                            />
                        </span>
                    ))}
            </div>
        </div>
                {/* =============================================== */}

            {/* 중간 부분 */}
            <div className={styles.Profile_mid}>
                <p className={styles.Profile_mid_p}>나의 활동</p>
                
                 {/* 둥근 부분 */}
                 <div className={styles.Profile_mid_content}>
                    <div className={styles.Profile_mid_content01} onClick={goToPost}>
                        <p className={styles.Profile_mid_content_p}>작성한 게시글</p>
                        <p>{profile.length}개</p>
                    </div>

                    <div className={styles.Profile_mid_content_line}></div>
                    <div className={styles.Profile_mid_content01} onClick={goToComment}>
                        <p className={styles.Profile_mid_content_p}>댓글단 게시글</p>
                        <p>0개</p>
                    </div>

                    <div className={styles.Profile_mid_content_line}></div>
                    <div className={styles.Profile_mid_content01} onClick={goToBookmark}>
                    <p className={styles.Profile_mid_content_p}>북마크 게시글</p>
                    <p>0개</p>
                    </div>
                </div>
            </div>
        
        {/* 바닥 부분 */}
        <div className={styles.Profile_mid}>
                <p className={styles.Profile_mid_p}>자가진단 결과 목록</p>
                
                {/* 둥근 부분 */}
                <div className={styles.Profile_footer_content}>
                    <div className={styles.Profile_mid_content01}>
                        <p className={styles.Profile_mid_content_p}>우울증 자가진단</p>
                        <p className={styles.Profile_mid_footer_p}>마지막 검사일자: YYYY - MM - DD</p>
                        <button className={styles.Profile_footer_btn} onClick={goToBlue}>보러가기</button>
                    </div>
                    <div className={styles.Profile_mid_content_line}></div>
                    <div className={styles.Profile_mid_content01}>
                        <p className={styles.Profile_mid_content_p}>스트레스 자가진단</p>
                        <p className={styles.Profile_mid_footer_p}>마지막 검사일자: YYYY - MM - DD</p>
                        <button className={styles.Profile_footer_btn} onClick={goToStress}>보러가기</button>
                    </div>
                    <div className={styles.Profile_mid_content_line}></div>
                    <div className={styles.Profile_mid_content01}>
                    <p className={styles.Profile_mid_content_p}>불안 자가진단</p>
                    <p className={styles.Profile_mid_footer_p}>마지막 검사일자: YYYY - MM - DD</p>
                        <button className={styles.Profile_footer_btn} onClick={goToAnxiety}>보러가기</button>
                    </div>
                </div>
            </div>
    </div>
  )
}