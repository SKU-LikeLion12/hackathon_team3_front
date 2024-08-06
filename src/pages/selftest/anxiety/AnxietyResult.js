import React,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap'
import styles from './Anxiety.module.css'
import { useLocation , useNavigate } from 'react-router-dom';
import AnxietyTest from './AnxietyTest'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AnxietyRecom from './AnxietyRecom';


const AnxietyResult = () => {

    const [isLogined, setIsLogined] = useState(false);
    const [role, setRole] = useState(null);
    const category = 'unrest'
    
    //로그인 유지 부분
    useEffect(() => {
        const memberToken = localStorage.getItem('memberToken');
        if (memberToken) {
          try {
            const decodedmemberToken = jwtDecode(memberToken);
            setRole(decodedmemberToken.role);
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
    
    // 네비게이트 함수
    const Navigate = useNavigate();

    const goToMain=()=>{
        Navigate('/')
    }

    const goToBlue=()=>{
        Navigate('/blue')
    }

    const goToStress=()=>{
        Navigate('/StressTest')
    }
    
    const goToAnxiety=()=>{
        Navigate('/anxiety')
    }

    const goToMap=()=>{
        Navigate('/hospital_map')
    }

    //url에 나타내기 위함
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    //선택한 값을 가져오기 위함
    const buttonStates = JSON.parse(queryParams.get('buttonStates')) || [];

    // 총합 
    const sum = buttonStates.reduce((total, buttons) => {
        const selectedButton = buttons.find(button => button.active);
        return total + (selectedButton ? selectedButton.value : 0);
    }, 0);

    console.log(`총 결과값: ${sum}`);

    // ===========================================================================

    //결과 저장하기
    const saveTest = async() => {
        try {
            await axios.post('https://team3back.sku-sku.com/test/result', {
              token: localStorage.getItem('memberToken'),
              category: 'unrest',
              score : sum
            });
            alert('저장 완료');
            // window.location.href = '/profile';  
          } catch (error) {
            console.error('실패했습니다', error);
            alert('결과를 저장하지 못했습니다');
          }
    }


    return (
        <Container>
        <div className={styles.topText}>
              <div className={styles.topTextCusor} onClick={goToMain}>홈</div>
              <div className={styles.Arrow}></div>
              <div className={styles.topTextCusor} onClick={goToBlue}>자가진단</div>
              <div className={styles.Arrow}></div>
              <div className={styles.topTextCusor} onClick={goToAnxiety}>불안</div>
          </div>
  
          <div style={{fontSize: 20, fontWeight: "bold"}}>나의 마음 들여다보기</div>
  
          <div className={styles.topSetion2}>
              <button className={styles.section2dsign2} onClick={goToBlue}><span >우울증</span></button>
              <button className={styles.section2dsign2} onClick={goToStress}><span >스트레스</span></button>
              <button className={styles.section2dsign} onClick={goToAnxiety}><span >불안</span></button>
          </div>
        {/* 결과 박스 */}
        <div className={styles.resultContainer}>
        <AnxietyTest sum={sum} onClick={goToMap}/>
        <AnxietyRecom sum={sum} />

        <div className={styles.resultButtonBox}>
            <button className={styles.resultButton1} onClick={saveTest}>결과 저장하기</button>
            <button className={styles.resultButton2} onClick={goToBlue}>다시 검사하기</button>
        </div>
        </div>
        {/* 추천 영상 */}

        

        
    </Container>
    );
};

export default AnxietyResult;