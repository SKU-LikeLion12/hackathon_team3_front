import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from '../Comm.module.css';
import 'pretendard/dist/web/static/pretendard.css';
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProCommWrite() {
  
  const navigate = useNavigate();
  const goToMain = () => { navigate('/') };
  const goToComm = () => { navigate('/comm_list') };
  const goToproComm = () => { navigate('/pro_comm_list') };

  

  const [role, setRole] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
 //로그인 토큰 가져오기
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

// 끄적이기 로그인 여부 확인
const [isLogined, setIsLogined] = useState(false);
useEffect(() => {
  const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  setIsLogined(loggedIn);
}, []);

// 로그인 여부 확인 후 링크 이동
const handleLoginClick = () => {
  if (!isLogined) {
    sessionStorage.setItem('redirectPath', '/pro_comm_write');
    navigate('/login');
  } else {
    navigate('/pro_comm_write');
  }
};

//=============================================================

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  //작성한 부분
  const handleSubmit = async () => {
    if (role !== 'Expert') {
        console.error('전문가 회원이 아닙니다');
        alert('전문가 회원이 아닙니다. 고민 끄적끄적을 이용해주세요');
        return;
    }
    try {   
        await axios.post('http://52.78.131.56:8080/expert/post', {
            title,
            content,
            token: localStorage.getItem('memberToken'),
        });

        alert('글이 성공적으로 등록되었습니다.');
        window.location.href='/pro_comm_list'; 
    } catch (error) {
        console.error('데이터를 전송하는데 실패했습니다', error);
        alert('데이터를 전송하지 못했습니다.');
    }
};
  

  return (
    <div className={styles.CommList_container}>
      {/* 왼쪽 */}
      <div className={styles.CommList_left}>
        <h2 className={styles.CommList_left_h2}>커뮤니티</h2>
        <p className={styles.CommList_left_h2}>
          끄적여봐,<br />
          깊이 담긴 내면의 이야기들을<br />
          우리가 끄덕여줄게.
        </p>
        <p className={styles.CommList_left_p2} onClick={goToComm}>고민 끄적끄적</p>
        <p className={styles.CommList_left_p} onClick={goToproComm}>전문의 정보 끄적끄적</p>
      </div>

      {/* 오른쪽 부분 */}
      <div className={styles.CommList_right}>

        {/* 여기가 글 쓰는 부분 상단 */}
        <div className={styles.CommList_right_header}>
          <p className={styles.header_p}>
            <span onClick={goToMain}>홈</span> <FaAngleRight/> <span onClick={goToComm}>커뮤니티</span> <FaAngleRight /><span onClick={goToproComm}>전문의 정보 끄적끄적</span> <FaAngleRight />
          </p>
          <p className={styles.header_p2}>끄적이기</p>
        </div>

        {/* 글 쓰는 부분 메인 */}
        <div className={styles.write_container}>
          <h2 className={styles.CommList_left_h22} style={{marginBottom:'40px'}}>전문의 귀한 정보 끄적끄적</h2>

          {/* 제목 부분 */}
          <div className={styles.write_header}>
            <p className={styles.write_title2}>제목</p>
            <input 
              type='text' 
              className={styles.write_input} 
              value={title} 
              onChange={handleTitleChange} 
            />
          </div>

          {/* 내용 부분 */}
          <div className={styles.write_header2}>
            <p className={styles.write_title3}>본문</p>
            <textarea 
              className={styles.write_textarea} 
              placeholder='비하/욕설 등과 같은 게시글은 관리자에 의해 블라인드 처리될 수 있습니다.' 
              value={content} 
              onChange={handleContentChange} 
            />
          </div>

          {/* 버튼 부분 */}
          <div className={styles.write_header3}>
            <button className={styles.cancell_btn} onClick={goToproComm}>취소</button>
            <button className={styles.add_btn} onClick={handleSubmit}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}
