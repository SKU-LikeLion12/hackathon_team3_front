import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProSignupContext() {
    const navigate = useNavigate();

    // 입력값들 (아이디)
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    // 입력값들 (비번)
    const [pw, setPw] = useState('');
    const [checkPW, setCheckPW] = useState('');
    const [matchpw, setMatchPW] = useState(false); //비번 맞는지 확인용
    const [showPw, setShowPw] = useState(false); //비번 숨기고 보기
    const [showPw2, setShowPw2] = useState(false); //비번 숨기고 보기 22

    // 입력이 되기 위함
    const handleFieldChange = (setter) => (e) => setter(e.target.value);

    // 비밀번호 숨기고 보기용
    const handlePw = () => setShowPw(prev => !prev);
    const handlePw2 = () => setShowPw2(prev => !prev);

    // 첫번째 비번
    const handlePW02 = (e) => {
      setPw(e.target.value);
      if (pw === checkPW) setMatchPW(false);
    };

    // 두번째 비번
    const handleCheckPW = (e) => {
      setCheckPW(e.target.value);
      if (pw === e.target.value) setMatchPW(false);
      else setMatchPW(true);
    };

    // 휴대폰 인증번호 보내기 
    const [num, setNum] = useState(false);
    const [phoneNum, setPhoneNum] = useState('');
    const [randomNum, setRandomNum] = useState('')

    const handlePhone = async () => {
      setNum(true);
      try {
        const response = await axios.post('http://52.78.131.56:8080/check/sendSMS', { phoneNumber: phoneNum });
        if (response.status === 200) {
          alert('SMS 발송 요청이 성공적으로 처리되었습니다.');
          setRandomNum(response.data.randomNumber);  // 서버로부터 랜덤번호를 받아서 상태에 저장
        } else {
          alert('SMS 발송 요청에 실패하였습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        alert('서버와 연결하는 데 문제가 발생했습니다.');
      } finally {
        setNum(false);
      }
    };

    // 폰 인증번호 확인
    const [certified, setCertified] = useState('');

    const checkNum = async () => {
      try {
        const response = await axios.post('http://52.78.131.56:8080/check/certification', {
          phoneNumber: String(phoneNum),
          randomNumber: String(certified)
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          alert('인증 성공');
          setCertified(true);  // 인증 성공 시 certified 값을 true로 설정
        } else {
          alert('인증 실패');
        }
      } catch (error) {
        alert('서버와 연결하는 데 문제가 발생했습니다.');
      } finally {
        setNum(false);
      }
    };

    // 아이디 중복확인
    const [checkId, setCheckId] = useState('none');
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    const showcheckId = async () => {
      if (!userId) {
        alert('사용자 ID를 입력해 주세요.');
        return;
      }

      try {
        const response = await axios.get(`http://52.78.131.56:8080/signup/checkId/${userId}`);
        const message = response.data;

        if (typeof message === 'string') {
          if (message === '사용 가능한 아이디입니다.') {
            setCheckId('none');
            setIsIdAvailable(true);
          } else if (message === '이미 사용 중인 아이디입니다.' || message === '이미 존재하는 아이디 입니다.') {
            setCheckId('block');
            setIsIdAvailable(false);
          } else {
            console.error('알 수 없는 응답 메시지:', message);
            setCheckId('none');
            setIsIdAvailable(false);
          }
        } else {
          console.error('서버 응답 데이터가 예상과 다릅니다:', message);
          setCheckId('none');
          setIsIdAvailable(false);
        }
      } catch (error) {
        console.error('API 호출 에러:', error);
        console.error('에러 응답 데이터:', error.response?.data);
        console.error('에러 메시지:', error.message);
        setCheckId('none');
        alert('서버와 연결하는 데 문제가 발생했습니다.');
      }
    };

    // 닉네임 중복체크
    const [isNickAvailable, setIsNickAvailable] = useState(false);
    const [checkMsg, setCheckMsg] = useState('none');

    // 닉네임 중복확인
    const showcheckMsg = async () => {
      if (!userId || !nickname) {
        alert('아이디와 닉네임을 입력해 주세요.');
        return;
      }

      try {
        const response = await axios.get(`http://52.78.131.56:8080/signup/checkId/${userId}`);
        console.log('API 응답 데이터:', response.data);
        const data = response.data;

        if (typeof data === 'string') {
          if (data === '사용 가능한 아이디입니다.' || data === '사용 가능한 닉네임입니다.') {
            setCheckMsg('none');
            setIsNickAvailable(true);
          } else if (data === '이미 사용 중인 아이디입니다.' || data === '이미 존재하는 아이디 입니다.' || data === '이미 사용 중인 닉네임입니다.' || data === '이미 존재하는 닉네임 입니다.') {
            setCheckMsg('block');
            setIsNickAvailable(false);
          } else {
            console.error('알 수 없는 응답 메시지:', data);
            setCheckMsg('none');
            setIsNickAvailable(false);
          }
        } else if (typeof data === 'object' && data !== null) {
          if (data.message) {
            if (data.message === '사용 가능한 닉네임입니다.' || data.message === '사용 가능한 아이디입니다.') {
              setCheckMsg('none');
              setIsNickAvailable(true);
            } else if (data.message === '이미 사용 중인 닉네임입니다.' || data.message === '이미 존재하는 닉네임 입니다.' || data.message === '이미 사용 중인 아이디입니다.' || data.message === '이미 존재하는 아이디 입니다.') {
              setCheckMsg('block');
              setIsNickAvailable(false);
            } else {
              console.error('알 수 없는 응답 메시지:', data.message);
              setCheckMsg('none');
              setIsNickAvailable(false);
            }
          } else {
            console.error('서버 응답 데이터가 예상과 다릅니다:', data);
            setCheckMsg('none');
            setIsNickAvailable(false);
          }
        } else if (Array.isArray(data)) {
          const isDuplicate = data.some(item => item.nickname === nickname);
          setCheckMsg(isDuplicate ? 'block' : 'none');
          setIsNickAvailable(!isDuplicate);
        } else {
          console.error('서버 응답 데이터가 예상과 다릅니다:', data);
          setCheckMsg('none');
          setIsNickAvailable(false);
        }

      } catch (error) {
        console.error('API 호출 에러:', error);
        console.error('에러 응답 데이터:', error.response?.data);
        console.error('에러 메시지:', error.message);
        setCheckMsg('none');
        alert('서버와 연결하는 데 문제가 발생했습니다.');
      }
    };

    // 맨 위의 동의
    const [agree, setAgree] = useState(false);

    const handleAgree = () => {
      console.log('동의 여부:', agree);
      setAgree(prev => !prev);
    };

    // 모든 필드가 입력되었는지 확인
    const btn = userId !== '' && 
      pw !== '' && 
      checkPW !== '' && 
      nickname !== '' && 
      birthYear !== '' && 
      birthMonth !== '' && 
      birthDay !== '' && 
      gender !== '' && 
      phoneNum !== '' && 
      certified &&
      image && image.size > 0;

      //이미지 업로드 

      const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        console.log('파일 선택:', selectedFile);
        if (selectedFile) {
            setImage(selectedFile);
        }
    };
    
    const handleFileUpload = () => {
        if (!image) {
            alert('파일을 선택하세요');
            return;
        }
      };
    
      //회원가입
      const postProData = async () => {
        if (pw !== checkPW) {
          setMatchPW(true);
          alert('다시 확인해주세요');
          return;
        }
      
        const birth = `${birthYear}${birthMonth.padStart(2, '0')}${birthDay.padStart(2, '0')}`;
        const birthRegex = /^\d{4}\d{2}\d{2}$/;
        if (!birthRegex.test(birth)) {
          alert('생년월일 형식이 올바르지 않습니다.');
          return;
        }
      
        try {
          // FormData 객체를 생성
          const formData = new FormData();
          formData.append('userId', userId);
          formData.append('nickname', nickname);
          formData.append('password', pw);
          formData.append('birth', birth);
          formData.append('gender', gender);
          formData.append('phoneNum', phoneNum);
          formData.append('email', email);
      
          // image가 File 객체인지 확인
          if (image instanceof File) {
            formData.append('image', image);
          } else {
            console.warn('Image is not a File object');
          }
      
          const response = await fetch('http://52.78.131.56:8080/signup/Expert', {
            method: 'POST',
            body: formData, // FormData 객체를 body로 설정
          });
      
          // 응답의 상태 코드와 Content-Type 확인
          const contentType = response.headers.get('Content-Type');
          console.log('응답 Content-Type:', contentType);
      
          let responseBody;
          if (response.ok) {
            if (contentType && contentType.includes('application/json')) {
              responseBody = await response.json(); // JSON 형식일 경우
            } else {
              responseBody = await response.text(); // JSON이 아닐 경우
              console.warn('서버 응답 텍스트:', responseBody); // 응답 내용 로그 출력
            }
      
            console.log('서버 응답 데이터:', responseBody);
      
            // 서버 응답에 대한 추가 처리
            if (typeof responseBody === 'string') {
              // 응답이 문자열인 경우 추가 처리
              console.log('서버 응답 문자열:', responseBody);
              // 문자열에 기반하여 추가 로직을 구현할 수 있음
            }
      
            const confirmed = window.confirm('관리자의 승인까지 1~3일 소요됩니다. 로그인 페이지로 이동하시겠습니까?');
            if (confirmed) {
              navigate('/login');
            }
          } else {
            throw new Error(`회원가입 요청이 실패했습니다. 상태 코드: ${response.status}`);
          }
          
        } catch (error) {
          console.error('오류 발생:', error);
          alert('회원가입 중 오류가 발생했습니다.');
        }
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
      postProData, handleFieldChange,
      isIdAvailable, setIsIdAvailable,
      isNickAvailable, setIsNickAvailable,
      btn, agree, setAgree, handleAgree, certified, setCertified,
      email, setEmail, image, setImage, handleFile, handleFileUpload, checkNum
    };
}