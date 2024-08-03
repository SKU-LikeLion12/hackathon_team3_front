import React, { useEffect, useState } from 'react';
import styles from '../Community/Comm.module.css'; // 커뮤니티에서 가져온 스타일
import 'pretendard/dist/web/static/pretendard.css'; // 프리텐다드 폰트 스타일
import styles2 from './Mypage.module.css'; // 마이페이지에서 가져온 스타일
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // 수정된 부분
import UseProfileContext from './UseProfileContext'

export default function MyComment() {
  const [isLogined, setIsLogined] = useState(false);
  const [role, setRole] = useState(null);
  const [mycomment, setmycomment] = useState([]);
  const { id } = useParams();

  const  {fetchmypost,  post} = UseProfileContext()

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
        fetchmypost();
      } catch (error) {
        console.error('토큰 해독 실패', error);
        setIsLogined(false);
      }
    } else {
      setIsLogined(false);
    }
  }, []);

  const fetchmycomment = async () => {
    const memberToken = localStorage.getItem('memberToken'); // 여기서 가져옴
    try {
      const response = await axios.get('http://52.78.131.56:8080/post/mycommentposts', {
        headers: {
          Authorization: `Bearer ${memberToken}`
        }
      });
      setmycomment(response.data);
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다', error);
      alert('데이터를 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    if (isLogined) {
      fetchmycomment();
    }
  }, [isLogined]);

  return (
    <div className={styles2.MyPost}>
      {/* 상단 부분 */}
      <div className={styles2.MyPost_top}>
        <div className={styles2.MyPost_top01}>
          <img className={styles2.Profile_img} src='./img/profile.jpg' alt='' />
          <p className={styles2.MyPost_top_p}>
            나의 활동
          </p>
          <p className={styles.MyPost_top_p2}>댓글 단 게시글 {mycomment.length}건</p>
        </div>
        <div className={styles2.Profile_top02}>
        {post.length > 0 && (
            <p className={styles2.Profile_top02_p1}>{post[0].writer}</p>
        )}
        </div>
      </div>

      {/* 여기가 작성한 내용들 */}
      <div className={styles2.postList}>
        {mycomment.length > 0 ? (
          mycomment.map((mycomment, i) => (
            <Link 
              key={mycomment.id} 
              to={role === 'EXPERT' ? `/pro_comm_view/${mycomment.id}` : `/comm_view/${mycomment.id}`} 
              className={styles.CommList_main}
            >
              <div className={styles2.List} style={{ display:'flex'}}>
                <h3 className={styles.main_h3}>{mycomment.title}</h3>
                <p className={styles.main_p}>{mycomment.content}</p>
                {/* 맨 밑에 부분 */}
                <div className={styles.CommList_main_bottom}>
                  {/* 맨 밑 왼쪽 */}
                  <div className={styles.main_bottom}>
                    <p className={styles2.MyPost_p}>{mycomment.writer}</p>
                    <p className={styles2.p_line}></p>
                    <p className={styles.MyPost_p}>{mycomment.createDate}</p>
                  </div>
                  <div className={styles.main_bottom2}>
                    <img className={styles.main_icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGzSURBVHgB3VTtUcJAEN0wFBArMHSAFSTpIFQgVgAdIBWAFRgrkA6SVCBWYKzAdBDfgz3mCHdhxow/dGcud5fdffduP07kr0ogA6QsywJTgpFjRFwHQfAYx/F6EHhRFBmAXl26tm1v0jRtRvJzCX0KAnMeAr7DaBz/c7PwhgXXZvxWWE7lyJJAe1z5BcxytVnCZmO51dBDndZOcDhEcHiWY6J8cgLR2G+w/8T/uQG+AFdgVkCkAE+YdwpC9pnehvpGD9j7GJyBW6W1V0dXTElii0MWSuDOZzeyHOYKXPcBU6BbkoveYOmzs6sl4wfAawIzRLjJF5Omh2fYt0y0seOMG9xfBYdRrKxyS9841qHalZrEiERc4GNlFapTbRSa9Ym1L+WyupjMW9ECEB/z35ATE8YXU2jeBdxmilC9dR2gfzChg88Hpsj4SA9zU6+HxGr91h17ApRc8HDRcFwtRSv7K80B/6UYlTn8rLW17Y2fS/qaaGa3si1VVbHdWaJ1kiQTH/jY3jCe2v6MNy5QkFXZaf8F7BiSQ/tLjwx5uGZ974oT3DpkrkzZXKEyfZfjQ7aVfy3fA/EHOjSA094AAAAASUVORK5CYII=' alt='' />
                    <p className={styles.main_p}>{mycomment.likeSize}</p>
                    <img className={styles.main_icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGmSURBVHgBzVSBbYNADHxQBmAEMkHJBDwTNJ0gZIKmE6TdIJkgbNBsAExQusGPwAb0DDayKCVfVZViCf0lb5/v/fYb808WLG2WZRlhoc9kWebMX4lBmAdBsAO0k61r13VnJKnMb4hBGIPwQoQgqIkIn+PthJORzylN0xcvYiYtCYN0/5Mq+L3C7wjYsPriFnGBgEc4b27Vk0t14Z8OMdk0JlRqd3B487kkVlmN6oLggzi+EcNyXq/G00iEWluQv88Rx/gaUYvsBzquwlvCdV0fgROOaVSSPZYEe3ZKPDXqgJSAbjsQ5IIhomXfiC+6Zd/eVry2rNpwUC7YWrtReC1YKXdyAiReTxVTbSN9FA87COHcZsgKKywVtRCP8aJJFwEWqosSnWSsMd9ujG/rQUqD5KQz6ILN8KaMXbVSMU4FW3Z0UNTIf2EYpiAjklaGgk7Ik1joaV1NFamJ6q2qRl86FRGeAU/KpX8B+W0xc8QU9GmGiaIjSadYJHuWUwE/YO0fKiQln9nLW3yPxXhcrRnqH3FSR5j7PYaoJ5TCe3K9jOrv0033bV+xcd+AVWl8LgAAAABJRU5ErkJggg==' alt='' />
                    <p className={styles.main_p}>{mycomment.commentSize}</p>
                    <img className={styles.main_icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADsSURBVHgB7ZThDYIwEIWvxgEcATfACaQbMIIbiBPgBuIIjuAEtRO4AiOwAb4zNFED7WFq5AcvufRIufeR3hWiWf+WGtowxiRKqTvSFQXUtu1Ba1317S08dUeJOQsfsh/a8wGiSApocAxnhEVec86rpFAEgOEGZ1wgMpfzyuAYgBqGtXtA3rgVkGuoWAJIeKL6NtDcLUUAsBEY5m2irLUnhodqpU1OXiEwL3E8haRwSXKlDIH5TWo+FvCEwDwdUzCZi/Z7AM88QiPWiAsJb3KoB033W6jcBeu06yYqR+NL+kYwyD5n3/NuTrMmqwf5GGsmO2z7xQAAAABJRU5ErkJggg==' alt='' />
                  </div>
                </div>
                {i !== mycomment.length - 1 && <div className={styles2.line}></div>}
              </div>
            </Link>
          ))
        ) : (
          <div className={styles2.No_postList}>
        <p>유저님이 댓글단 게시물이 없습니다.<br/>
        고민이 있는 분에게 다정함 한 스푼을 건네보세요.🌸</p>
        <Link to={role === 'EXPERT' ? '/pro_comm_list' : '/comm_list'}>
        <button className={styles2.No_postList_btn02}>다정함 건네러가기</button>
      </Link>
        </div>
        )}
      </div>
    </div>
  );
}