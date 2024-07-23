import { useState } from 'react';
import axios from 'axios';

export default function UseSignupContext() {
  // 입력값들 (아이디)
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState('');

  // 입력값들 (비번)
  const [pw, setPw] = useState('');
  const [checkPW, setCheckPW] = useState('');
  const [matchpw, setMatchPW] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  //입력이 되기 위함
  const handleFieldChange = (setter) => (e) => setter(e.target.value);

  // 비밀번호 숨기고 보기용
  const handlePw = () => setShowPw(prev => !prev);
  const handlePw2 = () => setShowPw2(prev => !prev);

  //첫번째 비번
  const handlePW02 = (e) => {
    setPw(e.target.value);
    if (pw === checkPW) setMatchPW(false); 
  };

  //2번째 비번
  const handleCheckPW = (e) => {
    setCheckPW(e.target.value);
    if (pw === e.target.value) setMatchPW(false);
    else setMatchPW(true); 
  };

  //폰
  const [phoneNum, setPhoneNum] = useState('');
  const [num ,setNum] = useState(false); //인증 번호 부분
  const handlePhone = () => {
    setNum(true)
  };

  // id 중복체크
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [checkId, setCheckId] = useState('none');

  const showcheckId = async () => {
    console.log('클릭')
    try {
      // 서버에서 사용자 데이터 가져오기
      const response = await axios.get('http://localhost:8080/getUserData');
      const users = response.data;

      // 현재 입력된 ID와 비교하여 중복 여부 확인
      const isDuplicate = users.some(user => user.userId === userId);

      if (isDuplicate) {
        setCheckId('block');
        setIsIdAvailable(false);
      } else {
        setCheckId('none');
        setIsIdAvailable(true);
      }
    } catch (error) {
      console.error('중복 확인 요청 실패:', error);
      setCheckId('none');
    }
  };


  // 닉넴 중복체크
  const [isNickAvailable, setIsNickAvailable] = useState(false);
  const [checkMsg, setCheckMsg] = useState('none');

  const showcheckMsg = async () => {
    console.log('클릭')
    try {
      // 서버에서 사용자 데이터 가져오기
      const response = await axios.get('http://localhost:8080/getUserData');
      const users = response.data;

      // 현재 입력된 ID와 비교하여 중복 여부 확인
      const isDuplicate = users.some(user => user.nickname === nickname);

      if (isDuplicate) {
        setCheckMsg('block');
        setIsNickAvailable(false);
      } else {
        setCheckMsg('none');
        setIsNickAvailable(true);
      }
    } catch (error) {
      console.error('중복 확인 요청 실패:', error);
      setCheckMsg('none');
    }
  };

  
  //버튼 초기에 비활성화
  const btn = userId !== '' && 
  nickname !== '' && 
  birthYear !== '' && 
  birthMonth !== '' && 
  birthDay !== '' && 
  gender !== '' && 
  pw !== '' && 
  checkPW !== '' &&
  phoneNum !== '' && 
  num !== ''

  // 서버로 포스트
  const postUserData = () => {
    if (pw !== checkPW) {
      setMatchPW(true);
      alert('다시 확인해주세요');
    }

    fetch('http://localhost:8080/postUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        nickname,
        password: pw,
        birthYear: `${birthYear}-${birthMonth}-${birthDay}`,
        gender,
        phoneNum,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('서버 응답:', data);
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });

      alert('회원가입이 완료되었습니다.')
  };

  return {
    userId, setUserId,
    nickname, setNickname,
    birthYear, setBirthYear,
    birthMonth, setBirthMonth,
    birthDay, setBirthDay,
    gender, setGender,
    checkId, setCheckId, showcheckId,
    checkMsg, setCheckMsg, showcheckMsg,
    pw, setPw,
    checkPW, setCheckPW,
    matchpw, setMatchPW,
    handlePW02, handleCheckPW,
    phoneNum, setPhoneNum,
    num , setNum,
    handlePhone,
    showPw, handlePw,
    showPw2, handlePw2,
    postUserData,handleFieldChange,
    isIdAvailable, setIsIdAvailable,
    isNickAvailable, setIsNickAvailable,
    btn 
  };
}