import React, { useEffect, useState } from 'react';
import styles from './Manager.module.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

// 더미 토큰 (테스트용)
const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6Im1hbmFnZXIiLCJleHBpcmF0aW9uIjoiMjAyNC0wNy0zMSIsImlhdCI6MTY4Njk2NzEyMH0.SzM4vDFwBQJMBU9e3gnhnUSrfA0X62Q4u1Kb36QlkJY';

const Manager = () => {
  const [expertCheck, setExpertCheck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState({});
  const [role, setRole] = useState(null);

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(dummyToken);
      setRole(decodedToken.role);

      // 더미 토큰의 role이 'manager'인지 확인
      if (decodedToken.role !== 'manager') {  // 관리자 역할 확인 (예: 'manager')
        alert('관리자 권한이 필요합니다.');
        window.location.href = '/';  // 리다이렉트할 페이지
        return;
      }

      fetchExpertCheck(); // 역할이 'manager'인 경우 데이터 가져오기
    } catch (error) {
      console.error('토큰 디코딩 오류:', error);
      alert('유효하지 않은 토큰입니다.');
      window.location.href = '/login';  // 리다이렉트할 페이지
    }
  }, []);

  //전문가인지 확인
  const fetchExpertCheck = async () => {
    try {
      const response = await axios.get('http://52.78.131.56:8080/admin/expertCheck', {
        
      });
      setExpertCheck(response.data);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  //수락 버튼
  const handleExpertAccept = async id => {
    const url = `http://52.78.131.56:8080/admin/changeIsExpert/${id}`;
    console.log(`Sending request to: ${url} with value: true`);

    try {
      // 서버에 true 값을 전송
      const response = await axios.post(url, true, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('memberToken')}`, // 실제 토큰 사용
        },
      });
      console.log('Response:', response.data);
      alert('승인되었습니다');
      setCompleted(prev => ({ ...prev, [id]: true }));
      setExpertCheck(prev => prev.map(item => (item.id === id ? { ...item, isExpert: true } : item)));
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };


  //거절 버튼
  const handleExpertReject = async (id) => {
    const url = `http://52.78.131.56:8080/admin/changeIsExpert/${id}`;

    try {
      // 서버에 false 값을 전송
      const response = await axios.post(url, false, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('memberToken')}`, // 실제 토큰 사용
        },
      });
      console.log('Response:', response.data);
      alert('거절 되었습니다');
      setCompleted(prev => ({ ...prev, [id]: true }));
      setExpertCheck(prev => prev.map(item => (item.id === id ? { ...item, isExpert: true } : item)));
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };

  return (
    <div>
      <div className={styles.pageText}>
        <p>관리자 페이지</p>
      </div>

      <div className={styles.boxUpTextBox}>
        <div className={styles.boxUpText}>
          <p>NUM</p>
          <p>ID</p>
          <p>NAME</p>
          <p>GENDER</p>
          <p>PHONE</p>
          <p>EMAIL</p>
          <p>BIRTH</p>
          <p>C-DATE</p>
          <p>U-DATE</p>
          <p>ISEXPERT</p>
          <p>STATUS</p>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.stateBox}>
          {expertCheck.map((item, index) => (
            <div key={item.id} className={styles.stateText}>
              <div className={styles.item}>{index + 1}</div>
              <div className={styles.item}>{item.userId}</div>
              <div className={styles.item}>{item.name}</div>
              <div className={styles.item}>{item.gender}</div>
              <div className={styles.item}>{item.phone}</div>
              <div className={styles.item}>{item.email}</div>
              <div className={styles.item}>{item.birth}</div>
              <div className={styles.item}>{item.createDate}</div>
              <div className={styles.item}>{item.updateDate}</div>
              <div className={styles.item}>{item.isExpert ? 'Yes' : 'No'}</div>
              
              <button
                className={`${styles.acceptbut} ${completed[item.id] ? styles.complite : ''}`}
                onClick={() => handleExpertAccept(item.id)}
                disabled={completed[item.id]}
              >
                {completed[item.id] ? '완료' : '수락'}
              </button>
              <button
                className={styles.rejectbut}
                onClick={() => handleExpertReject(item.id)}
              >
                거절
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manager;