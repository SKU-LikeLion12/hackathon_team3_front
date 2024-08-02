//유저가 작성한 글

import React, { useState  , useEffect} from 'react';
import styles from '../Community/Comm.module.css'; // 커뮤니티에서 가져온 스타일
import 'pretendard/dist/web/static/pretendard.css'; // 프리텐다드 폰트 스타일
import styles2 from './Mypage.module.css'; // 마이페이지에서 가져온 스타일
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

export default function MyPost() {

  const [test , setTest] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [role, setRole] = useState(null);
  const [mypost, setmypost] = useState([]);
  const { id } = useParams();

  const handleTest = () => {
    setTest(!test);
  };

  // 로그인 유지
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

  const fetchmypost = async () => {
    const memberToken = localStorage.getItem('memberToken'); // 여기서 가져옴
    try {
      const response = await axios.get('http://52.78.131.56:8080/post/myposts', {
        headers: {
          Authorization: `Bearer ${memberToken}`
        }
      });
      setmypost(response.data);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    if (isLogined) {
      fetchmypost();
    }
  }, [isLogined]);

  return (
    <div className={styles2.MyPost}>

    {/* 상단 부분 */}
    <div className={styles2.MyPost_top}>
     
        <div className={styles2.MyPost_top01}>
          <img className={styles2.Profile_img} src='./img/profile.jpg' alt='' />
          <p className={styles2.MyPost_top_p} onClick={handleTest}>
            나의 활동
          </p>
          <p className={styles.MyPost_top_p2}>작성한 게시글 {mypost.length}건</p>
        </div>

        <div className={styles2.Profile_top02}>
          <p className={styles2.Profile_top02_p1}>3팀 가보자고(@babyLion)</p>
        </div>
    </div>
      
         {/* 여기가 작성한 내용들 */}
      <div className={styles2.postList}>
        {mypost.length > 0 ? (
          mypost.map((post, i) => (
            <div className={styles2.List} key={post.id} style={{ display: test ? 'flex' : 'none' }}>
              <h3 className={styles.main_h3}>{post.title}</h3>
              <p className={styles.main_p}>{post.content}</p>
              {/* 맨 밑에 부분 */}
              <div className={styles.CommList_main_bottom}>
                {/* 맨 밑 왼쪽 */}
                <div className={styles.main_bottom}>
                  <p className={styles2.MyPost_p}>{post.writer}</p>
                  <p className={styles2.p_line}></p>
                  <p className={styles.MyPost_p}>{post.createDate}</p>
                </div>
                <div className={styles.main_bottom2}>
                  <img className={styles.main_icon} src='data:image/png;base64,...' alt='' />
                  <p className={styles.main_p}>{post.likeSize}</p>
                  <img className={styles.main_icon} src='data:image/png;base64,...' alt='' />
                  <p className={styles.main_p}>{post.commentSize}</p>
                  <img className={styles.main_icon} src='data:image/png;base64,...' alt='' />
                </div>
              </div>
              {i !== mypost.length - 1 && <div className={styles2.line}></div>}
            </div>
          ))
        ) : (
          <div className={styles2.No_postList} style={{ display: test ? 'none' : 'flex' }}>
            <p>
              유저님이 끄적인 게시물이 없습니다. <br />
              혹시 무슨 고민이 있다면 끄적여보세요.✏️
            </p>
            <Link to='/comm_write'>
              <button className={styles2.No_postList_btn}>끄적이러 가기</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
