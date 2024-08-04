import React, { useState, useEffect } from 'react';
import 'pretendard/dist/web/static/pretendard.css';
import styles from './Login.module.css';
import {jwtDecode} from 'jwt-decode';  // import the correct jwtDecode
import { NavLink, useNavigate } from 'react-router-dom';
import usePWContext from '../../components/pw/PwContext';
import axios from 'axios';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [memberToken, setMemberToken] = useState('');
  const [adminId, setadminId] = useState('');
  const [adminPw, setadminPw] = useState('');

  const [showPw, handlePw] = usePWContext();
  const navigate = useNavigate();

  //엔터키 이벤트 추가
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        submitLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, pw, saveId]);

  useEffect(() => {
    const savedId = localStorage.getItem('savedId');
    if (savedId) {
      setId(savedId);
      setSaveId(true);
    }

    const token = localStorage.getItem('memberToken');
    if (token) {
      setMemberToken(token);

      // JWT 디코딩 전 토큰 형식 확인
      if (token && token.split('.').length === 3) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.role) {
            navigate(`/member/${decodedToken.sub}`);
          }
        } catch (error) {
          console.error('JWT 디코딩 오류:', error.message || error);
          alert('유효하지 않은 토큰입니다.');
        }
      } else {
        console.error('유효하지 않은 토큰 형식:', token);
        alert('유효하지 않은 토큰 형식입니다.');
      }
    }
  }, [navigate]);

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePW2 = (e) => {
    setPw(e.target.value);
  };

  const handleSaveId = (e) => {
    setSaveId(e.target.checked);
  };

  const no_btn = id !== '' && pw !== '';

  const submitLogin = async () => {
    try {
      const response = await axios.post('http://52.78.131.56:8080/login', {
        userId: id,
        password: pw
      });
  
      if (response.status === 200 && response.data) {
        const token = response.data;
  
        // JWT 형식 확인 및 저장
        if (typeof token === 'string' && token.split('.').length === 3) {
          localStorage.setItem('memberToken', token);
          setMemberToken(token);
  
          // JWT에서 사용자 정보 추출
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub;
          const role = decodedToken.role;
          localStorage.setItem('userId', userId);
  
          if (saveId) {
            localStorage.setItem('savedId', id);
          } else {
            localStorage.removeItem('savedId');
          }
  
          sessionStorage.setItem('isLoggedIn', 'true');
  
          // 역할에 따라 리다이렉트 경로 설정
          const redirectPath = sessionStorage.getItem('redirectPath') || (role === 'Expert' ? `/promember/${userId}` : `/member/${userId}`);
          sessionStorage.removeItem('redirectPath');
          navigate(redirectPath);
        } else if (token === '전문가 자격 승인 요청이 처리되지 않았습니다.') {
          console.log('전문가 자격 승인 요청이 처리되지 않았습니다:', token);
          alert('전문가 자격 승인 요청이 처리되지 않았습니다.');
        } else {
          console.log('잘못된 토큰 데이터:', token);
          alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
      }
    } catch (error) {
      if (error.response) {
        console.error('로그인 요청 에러:', error.response.data.message || error.response.data || error.message);
        alert(`로그인 오류: ${error.response.data.message || '서버와 연결하는 데 문제가 발생했습니다.'}`);
      } else {
        console.error('로그인 요청 에러:', error.message || error);
        alert('서버와 연결하는 데 문제가 발생했습니다.');
      }
    }
  };

  // admin/login 부분(어디에 어떻게 써야 될지 사실 모르겠음)
  const adminLogin = async () => {
    try {
      const response = await axios.post('http://52.78.131.56:8080/admin/login', {
        Id: adminId,
        Password: adminPw
      }, {
        headers: {
          'Authorization': `Bearer ${memberToken}`
        }
      });

      const user = response.data;
      if (user) {
        if (saveId) {
          localStorage.setItem('savedId', id);
        } else {
          localStorage.removeItem('savedId');
        }
        const redirectPath = sessionStorage.getItem('redirectPath') || `/`;
        sessionStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 에러:', error.message || error);
      alert('서버와 연결하는 데 문제가 발생했습니다.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <p className={styles.serviceName}>로그인</p>

      <label className={styles.labelContainer}>
        아이디
        <input 
          type='text' 
          placeholder='아이디를 입력하세요.' 
          className={styles.inputField}
          value={id}
          onChange={handleId}
        />
      </label>

      <label className={styles.labelContainer}>
        비밀번호
        <div className={styles.search}>
          <input 
            type={showPw ? 'text' : 'password'}
            placeholder='비밀번호를 입력해주세요.' 
            maxLength="16" 
            aria-hidden='true' 
            className={styles.inputField2}
            value={pw}
            onChange={handlePW2}
          />
          <span onClick={handlePw}>
            {showPw ? 
               <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAYCAYAAAACqyaBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF1SURBVHgBxVaBUcMwDPx2gozgDcgGeAPYoNmAbAArMEG7ATCB0wmSDQITFCYAmdh3jptIcukdf/dXt31JtizL3kAPQ7wn3hLr8D1iIL4Tj8TXML4KLNERvwvogt3FqIgvhUFz7jHPkAo+reMfA0eOwZ8KO+KJcdZh2vsq6P1nQ+yFSeykwLXgoBXsnwR7u2ZowKdaChzRMj5OWKkBLm37TGvDbw5TUeZ76sCfhBka8OkyipW12eTU2zcywj7RGehT2gvaahtWnRrlOGarXkOs+iW7Ra0P/gAen8n4RtDWK3ZLuNsqRCm+hP8r6PGb9rcCh4OgHVbslvAcRVxHywuO05pEyxXcmM6Cawx5Z9IcNSP4a5DBQd8YfGH5e7sjHnDeNg/QZXI2Wy6l12ivI5hjbcGn6xGXB/YUr9ZGcNAHTXql+ivWge9oDZT4t8dEhAFfOBr6G6+k8ZzBYqrqkqAdFA/IDfQwmPbWhnHa5z8wdbcOBU/nHxvoTp2YPznCAAAAAElFTkSuQmCC' alt=''></img> 
              : 
               <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAYCAYAAAACqyaBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKKSURBVHgBxVbJkdpAFP3SsB1xBnIERgcolsOICGwiMBOBIYKBCGYcweAIjCOwOLAfUAaDM8BHKBa/Z0tUD6hbmDnMr1LRdL/+r//abcmFMh6PHcuyPuG7xVfAlKMsB4fDYYlvgK9fqVSWl+i0kgAg9W5ubu4x9ORy8Xe7XReH8OUa8sVikd9sNk+0Vq6XXniIpVxKPhwOC+l0+ru8dO1VwnBst9tGrVYLTtfs04npdPoZxD8NxAPbthvAvCuVShZ/MXcHDwVxYMw7wCyo92xN/RNavNCQyn6/b5fL5UfdOgg6ILvXrSMEdTUPjuTMZiSW1uIk4kgmk0kLnnnQLK9wADfKgSP5bDajxQXNph5cfKcclBVANzqI6Qox7aoxhS4a4Wl0+dBV58AOwU0DMd3VFcWy0EPc47EaGKrRaNSKw8eIF2GtkPxZ9AkW4KSuyDE0zxrcC5cmeHKFA7+3Q6sd0csgGoC4ZcDlEetm3L447Hq9btLtXwwg1ulK+fshAVvQ7DsTHPQjyY2gE+W/ExTm5XLJ2yihHyYEEkpVGIhZAs2+M0F+fLWz2WxPzNbfRgMc1IiFwse4fafClovE7Nmu666g1FQaBdY1B8xkHZZNKMp0VoUYSjfS8bfOw87l68DhlSoK1sXpGS7e39/g4rra/RD7jugloNUcnLZX1mZsrNDF2tVq9VXtle6G1fXIQ8dbjROIWUOnNJVKPeDi0F4aScShAQ31bj+7z+GBJjzwJHoJmKm5XK7PfAkfHWyz7BeeZg+7Xztyt5ac8maPCQqBvHuZTPI64n4mk3HjiCmJD8j5fO5BSUcMdRsjA4ShUywWfRMokTwS5enM+Dqi9Hkc7pf8ez77//N0/gP6TGNxpu9IZQAAAABJRU5ErkJggg==' alt=''></img> 
              }
          </span>
        </div>
      </label>

      <div className={styles.checkboxContainer}>
        <input 
          type="checkbox" 
          id="checkbox_id1" 
          name="checkbox_name" 
          value="checkbox_value" 
          className={styles.checkbox}
          checked={saveId}
          onChange={handleSaveId}
        />
        <label htmlFor="checkbox_id1" className={styles.checkboxLabel}>아이디 저장</label>
      </div>

      <button 
        className={`${styles.no_LoginBtn} ${no_btn ? styles.loginBtn : ''}`} 
        onClick={submitLogin} 
        disabled={!no_btn}
      >
        로그인
      </button>

      <div className={styles.btnAndText}>
        <NavLink to='/firstsignup' className={styles.loginP}>회원가입</NavLink>
        <p className={styles.loginP2}></p>
        <NavLink to='/findPw' className={styles.loginP}>비밀번호 찾기</NavLink>
      </div>
    </div>
  );
}