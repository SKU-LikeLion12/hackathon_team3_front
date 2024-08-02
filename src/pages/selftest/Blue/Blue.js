import React, { useState, useEffect } from 'react';
import styles from './Blue.module.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// 각 테스트 항목을 위한 함수형 컴포넌트
const TestPart = ({ number, text, buttonStates, handleButtonClick, isLast }) => (
    <div className={styles.roofpart}>
        <div className={styles.testpart2}>
            <div className={styles.testcircle}><span>{number}</span></div>
            <p>{text}</p>
        </div>
        <div className={styles.part2}>
            {!isLast && <div className={styles.part2line}></div>}
            {[...Array(4)].map((_, index) => (
                <button
                    key={index}
                    className={`${styles.part2circlelast} ${buttonStates[index].active ? styles.active : ''} ${isLast ? styles.lastButton : ''}`}
                    onClick={() => handleButtonClick(number - 1, index)}
                >
                    {buttonStates[index].value}
                </button>
            ))}
        </div>
    </div>
);

export default function Blue() {
    const navigate = useNavigate();

    //페이지를 관리
    const [nowPage, setNowPage] = useState(0);

    const goToMain = () => navigate('/');
    const goToBlue = () => navigate('/blue');
    const goToStress = () => navigate('/StressTest');
    const goToAnxiety = () => navigate('/anxiety');

    const 결과보기 = () => {
        const queryParams = new URLSearchParams();
        queryParams.set('buttonStates', JSON.stringify(buttonStates));
        navigate(`/blueResult?${queryParams.toString()}`);
    };
    
    const 이전페이지 = () => {
        if (nowPage > 0) {
            setNowPage(prevPage => {
                //  스크롤을 맨 위로 이동
                window.scrollTo({ top: 200, behavior: 'smooth' });
                return prevPage - 1;
            });
        }
    };
    
    const 다음페이지 = () => {
        if (nowPage < Math.ceil(testData.length / 5) - 1) {
            setNowPage(prevPage => {
                //  스크롤을 맨 위로 이동
                window.scrollTo({ top: 200, behavior: 'smooth' });
                return prevPage + 1;
            });
        }
    };
    
    
    //첫번째 페이지와 마지막 페이지는 다르게 보여주기 위함!!
    const firstPage = nowPage === 0;
    const lastPage = nowPage === 3;

    //현재 페이지를 보기 위함
    useEffect(() => {
        console.log(`현재 페이지: ${nowPage + 1}`);
    }, []);

    // 상태 초기화
    const [testData, setTestData] = useState([]);
    const [buttonStates, setButtonStates] = useState([]);

    // 로컬 스토리지에서 상태 복원
    useEffect(() => {
        const savedStates = JSON.parse(localStorage.getItem('buttonStates'));
        if (savedStates) {
            setButtonStates(savedStates);
        }

        // 문제 항목들
        const exampleTestData  = [
            { number: 1, text: '평소에는 아무렇지도 않던 일들이 괴롭고 귀찮게 느껴졌다.' },
            { number: 2, text: '먹고 싶지 않고, 식욕이 없었다.' },
            { number: 3, text: '어느 누가 도와준다 하더라도, 나의 울적한 기분을 떨쳐 버릴 수 없을 것 같았다.' },
            { number: 4, text: '무슨 일을 하든 정신을 집중하기가 힘들었다.' },
            { number: 5, text: '비교적 잘 지냈다.' },
            { number: 6, text: '상당히 우울했다.' },
            { number: 7, text: '모든 일들이 힘들게 느껴졌다.' },
            { number: 8, text: '앞 일이 암담하게 느껴졌다.' },
            { number: 9, text: '지금까지의 내 인생은 실패작이라는 생각이 들었다.' },
            { number: 10, text: '적어도 보통 사람들만큼의 능력은 있었다고 생각한다.' },
            { number: 11, text: '잠을 설쳤다(잠을 잘 이루지 못했다).' },
            { number: 12, text: '두려움을 느꼈다.' },
            { number: 13, text: '평소에 비해 말수가 줄어들었다.' },
            { number: 14, text: '세상에 홀로 있는 듯한 외로움을 느꼈다.' },
            { number: 15, text: '큰 불만 없이 생활했다.' },
            { number: 16, text: '사람들이 나에게 차갑게 대하는 것 같았다.' },
            { number: 17, text: '갑자기 울음이 나왔다.' },
            { number: 18, text: '마음이 슬펐다.' },
            { number: 19, text: '사람들이 나를 싫어하는 것 같았다.' },
            { number: 20, text: '도무지 뭘 해 나갈 엄두가 나지 않았다.' }
          ];
        setTestData(exampleTestData);

        // 초기 버튼 상태 설정
        const initialButtonStates = exampleTestData.map(() =>
            Array(4).fill(false).map((_, index) => ({ value: index, active: false }))
        );
        setButtonStates(initialButtonStates);

    }, []);

    // 버튼 클릭 핸들러 함수
    const handleButtonClick = (questionIndex, buttonIndex) => {
        console.log(`문제 번호: ${questionIndex+1}, 선택한 값: ${buttonIndex}`);
        setButtonStates(prevState => {
            const updatedStates = prevState.map((buttons, qIndex) =>
                qIndex === questionIndex
                    ? buttons.map((button, bIndex) => ({
                        ...button,
                        active: bIndex === buttonIndex
                    }))
                    : buttons
            );
            localStorage.setItem('buttonStates', JSON.stringify(updatedStates));
            return updatedStates;
        });
    };

    const currentTestData = testData.slice(nowPage * 5, (nowPage + 1) * 5);
    const isLastPage = nowPage === Math.ceil(testData.length / 5) - 1;

    return (
        <Container>
            <div className={styles.topText}>
                <div className={styles.topTextCusor} onClick={goToMain}>홈</div>
                <div className={styles.Arrow}></div>
                <div className={styles.topTextCusor}>자가진단</div>
                <div className={styles.Arrow}></div>
                <div className={styles.topTextCusor}>우울증</div>
            </div>

            <div style={{ fontSize: 20, fontWeight: "bold" }}>나의 마음 들여다보기</div>

            <div className={styles.topSetion2}>
                <button className={styles.section2dsign} onClick={goToBlue}><span>우울증</span></button>
                <button className={styles.section2dsign2} onClick={goToStress}><span>스트레스</span></button>
                <button className={styles.section2dsign2} onClick={goToAnxiety}><span>불안</span></button>
            </div>

            <div className={styles.topSetion3}>
                <p>
                    해당 자가진단은 <span>'우울증'</span>에 관한 것입니다. <br />
                    아래에 있는 항목들은 지난 일주일 동안의 당신의 상태에 대한 질문입니다. <br />
                    이와 같은 일들이 지난 일주일 동안 얼마나 자주 일어났었는지 답변해 주십시오. <br />
                    <span>'끄적임'</span> 이 곳에선 숨기지 않으셔도 됩니다. <br />
                    솔직하게 답변하며 나의 마음을 들여다 보는 시간을 가져보세요.
                </p>
            </div>

            <div className={styles.topSetion4}>
                <p className={styles.section4p1}>왼쪽부터 0점 <span className={styles.line}></span> <span className={styles.Arrow2}></span> 3점입니다.</p> <br />
                <p>(1일 이하 : 0점, 1~2일 : 1점, 3~4일: 2점, 5일 이상: 3점)</p>
            </div>

            <div className={styles.testContainer}>
                {currentTestData.map((data, index) => (
                    <TestPart
                        key={index}
                        number={data.number}
                        text={data.text}
                        buttonStates={buttonStates[nowPage * 5 + index]}
                        handleButtonClick={handleButtonClick}
                        isLast={index === currentTestData.length - 1 && isLastPage}
                    />
                ))}
            
            {firstPage && (
                    <button className={styles.nextPage} onClick={다음페이지} style={{ marginLeft: '52vh' }}>
                        <p>다음 페이지</p> <span className={styles.nextPageline}></span> <span className={styles.nextPageArrow}></span>
                    </button>
                )} 
            {lastPage && (
                    <button className={styles.nextPage} onClick={결과보기} style={{ marginLeft: '52vh' }}>
                        <p>결과보기</p> <span className={styles.nextPageline}></span> <span className={styles.nextPageArrow}></span>
                    </button>
                )}    

            {!lastPage && !firstPage &&(
            <div className={styles.pageButtonBox}>
                <button className={styles.nextPage} onClick={이전페이지} disabled={nowPage === 0}>
                    <span className={styles.priviousPageline}></span>
                    <p>이전 페이지</p>
                    <span className={styles.priviousPageArrow}></span>
                </button>

                <button className={styles.nextPage} onClick={다음페이지} disabled={isLastPage}>
                    <p>다음 페이지</p>
                    <span className={styles.nextPageline}></span>
                    <span className={styles.nextPageArrow}></span>
                </button>
            </div>
            )}
            </div>
               
        </Container>
    );
}
