import React, { useState, useEffect } from 'react';
import styles from './Anxiety.module.css';
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

export default function Anxiety() {
    const navigate = useNavigate();

    // 페이지를 관리
    const [nowPage, setNowPage] = useState(0);

    const goToMain = () => navigate('/');
    const goToBlue = () => navigate('/blue');
    const goToStress = () => navigate('/StressTest');
    const goToAnxiety = () => navigate('/anxiety');

    const 결과보기 = () => {
        const queryParams = new URLSearchParams();
        queryParams.set('buttonStates', JSON.stringify(buttonStates));
        navigate(`/anxietyResult?${queryParams.toString()}`);
    };

    const 이전페이지 = () => {
        if (nowPage > 0) {
            setNowPage(prevPage => {
                window.scrollTo({ top: 200, behavior: 'smooth' });
                return prevPage - 1;
            });
        }
    };

    const 다음페이지 = () => {
        if (nowPage < Math.ceil(testData.length / 5) - 1) {
            setNowPage(prevPage => {
                window.scrollTo({ top: 200, behavior: 'smooth' });
                return prevPage + 1;
            });
        }
    };

     // 상태 초기화
     const [testData, setTestData] = useState([]);
     const [buttonStates, setButtonStates] = useState([]);

    // 첫 번째 페이지와 마지막 페이지를 다르게 보여주기 위함
    const firstPage = nowPage === 0;
    const lastPage = nowPage === Math.ceil(testData.length / 5) - 1;

    // 현재 페이지를 보기 위함
    useEffect(() => {
        console.log(`현재 페이지: ${nowPage + 1}`);
    }, [nowPage]);


    // 로컬 스토리지에서 상태 복원
    useEffect(() => {
        const savedStates = JSON.parse(localStorage.getItem('buttonStates'));
        if (savedStates) {
            setButtonStates(savedStates);
        }

        // 문제 항목들
        const exampleTestData = [
            { number: 1, text: '가끔 몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.' },
            { number: 2, text: '흥분된 느김을 받는다.' },
            { number: 3, text: '가끔씩 다리가 떨리곤 한다.' },
            { number: 4, text: '편안히 쉴 수가 없다.' },
            { number: 5, text: '매우 나쁜 일이 일어날 것 같은 두려움을 느낀다.' },
            { number: 6, text: '어지러움(현기증)을 느낀다.' },
            { number: 7, text: '가끔씩 심장이 두근거리고 빨리 뛴다.' },
            { number: 8, text: '침착하지 못하다.' },
            { number: 9, text: '자주 겁을 먹고 무서움을 느낀다.' },
            { number: 10, text: '신경이 과민되어 있다.' },
            { number: 11, text: '가끔씩 숨이 막히고 질식할 것 같다.' },
            { number: 12, text: '자주 손이 떨린다.' },
            { number: 13, text: '안절부절 못한다.' },
            { number: 14, text: '미칠 것 같은 두려움을 느낀다.' },
            { number: 15, text: '가끔씩 숨쉬기가 곤란할 때가 있다.' },
            { number: 16, text: '죽을 것 같은 두려움을 느낀다.' },
            { number: 17, text: '불안한 상태에 있다.' },
            { number: 18, text: '자주 소화가 안 되고 뱃속이 불편하다.' },
            { number: 19, text: '가끔씩 기절할 것 같다.' },
            { number: 20, text: '자주 얼굴이 붉어지곤 한다.' },
            { number: 21, text: '땀을 많이 흘린다.' }
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
        console.log(`문제 번호: ${questionIndex + 1}, 선택한 값: ${buttonIndex}`);
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
                <button className={styles.section2dsign2} onClick={goToBlue}><span>우울증</span></button>
                <button className={styles.section2dsign2} onClick={goToStress}><span>스트레스</span></button>
                <button className={styles.section2dsign} onClick={goToAnxiety}><span>불안</span></button>
            </div>

            <div className={styles.topSetion3}>
                <p>
                    해당 자가진단은 <span>'불안'</span>에 관한 것입니다. <br/>
                    아래에 있는 항목들은 불안한 상태에서 경험할 수 있는 것들입니다. <br/>
                    각 항목을 주의 깊게 읽고 지난 한 주 동안 당신의 경험이나 상태를 아래와 같이 그 정도에 따라 적절한 숫자로 표시하세요. <br/>
                    <span>'끄적임'</span> 이 곳에선 숨기지 않으셔도 됩니다. <br/>
                    솔직하게 답변하며 나의 마음을 들여다 보는 시간을 가져보세요.
                </p>
            </div>

            <div className={styles.topSetion4}>
                <p className={styles.section4p1}>왼쪽부터 0점 <span className={styles.line}></span> <span className={styles.Arrow2}></span> 3점입니다.</p> <br/>
                <p>(전혀 아니다 : 0점, 조금 느꼈다 : 1점, 상당히 느꼈다: 2점, 심하게 느꼈다 : 3점)</p>
            </div>

            <div className={styles.testContainer}>
                {currentTestData.map((data, index) => (
                    <TestPart
                        key={index}
                        number={data.number}
                        text={data.text}
                        buttonStates={buttonStates[nowPage * 5 + index]}
                        handleButtonClick={handleButtonClick}
                        isLast={index === currentTestData.length - 1 && lastPage}
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

            {!lastPage && !firstPage && (
                <div className={styles.pageButtonBox}>
                    <button className={styles.nextPage} onClick={이전페이지} disabled={nowPage === 0}>
                        <span className={styles.priviousPageline}></span>
                        <p>이전 페이지</p>
                        <span className={styles.priviousPageArrow}></span>
                    </button>

                    <button className={styles.nextPage} onClick={다음페이지} disabled={lastPage}>
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
