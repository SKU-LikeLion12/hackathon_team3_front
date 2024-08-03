import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import styles from './Comm.module.css';
import { Link, useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function CommView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const [content, setContent] = useState(''); //댓글 달기
  const [comments, setComments] = useState([]); // 댓글 보기
  const [save ,setSave] = useState(false); //게시글 저장
  const [loginId , setLoginId] = useState(''); //현재 로그인 한 아이디 보기용

  //끄적이기 로그인 여부 확인 계속 true 상태, 오류 잡아야 됨
  const [isLogined, setIsLogined] = useState(false);
  
  
  useEffect(() => {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      setIsLogined(loggedIn);
  }, []);

  //로그인 여부 확인 후 링크 이동
  const handleLoginClick = () => {
    console.log('Handle Login Click - Is Logined:', isLogined); // 추가된 로그
    if (!isLogined) {
        sessionStorage.setItem('redirectPath', '/comm_write');
        navigate('/login');
    } else {
        navigate('/comm_write');
    }
};

// 로그인 상태 확인
useEffect(() => {
  const memberToken = localStorage.getItem('memberToken');
  
  if (memberToken) {
    try {
      const decodedmemberToken = jwtDecode(memberToken);
      const decodedToken = jwtDecode(memberToken);
      setRole(decodedmemberToken.role);
      setIsLogined(true); // 로그인 상태 업데이트
      setLoginId (decodedmemberToken.sub) //현재 로그인한 아이디
      console.log('현재 로그인한 아이디 : ', decodedmemberToken.sub)
      console.log('현재 로그인 정보 : ', decodedmemberToken)
    } catch (error) {
      console.error('토큰 해독 실패', error);
      setIsLogined(false);
    }
  } else {
    setIsLogined(false);
  }
}, []);


// ====================================================================

  // 글 불러오기
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://52.78.131.56:8080/general/post/${id}`);
        const postData = response.data;

        // 카테고리 키로 변환
        const categoryKeyResult = {
          '일반 고민': 'a',
          '진로/취업': 'b',
          '학교': 'c',
          '직장': 'd',
          '대인 관계': 'e',
          '썸/연애': 'f',
          '결혼/육아': 'g',
          '이별/이혼': 'h',
          '가족': 'i',
          '성 생활': 'j',
          '외모': 'k',
          '금전': 'l',
          'LGBT': 'm'
        };

        const transCategoryKey = categoryKeyResult[postData.category] || 'unknown';
        console.log('작성한 닉네임:' , postData.writer) 
        console.log(postData)       
        setPost({ ...postData, category: transCategoryKey });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);
  
  // ====================================================================

  //댓글 보기
  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`http://52.78.131.56:8080/generalpost/comment/${id}`);
     
        setComments(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, [id]);


  //글 저장 여부 확인
  useEffect(() => {
    const savedState = localStorage.getItem(`savedPost_${id}`);
    setSave(savedState === 'true'); 
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>에러발생</p>;
  }

  if (!post) {
    return <p>게시글을 찾을 수 없다</p>;
  }

  // =======================================================================================
  
  // 댓글 달기
  const handleComent = async () => {
    
    if (role == 'EXPERT') {
      console.log('전문가 회원이다.');
      try {
        console.log(`내용 : ${content}`);
        // console.log(`내용 : ${proToken}`);
        const res = await axios.post(`http://52.78.131.56:8080/generalpost/comment/${id}`, {
          token: localStorage.getItem('memberToken'),
          content
        });
        alert('댓글 등록!!');
        window.location.reload();
      } catch (error) {
        console.error('데이터를 전송하는데 실패했습니다', error);
        alert('데이터를 전송하지 못했습니다.');
      }
    } else {
      console.log('일반 회원이다.');
      try {
        console.log(`댓글내용 : ${content}`);
        // console.log(`댓글 토큰 : ${proToken}`);
        const res = await axios.post(`http://52.78.131.56:8080/generalpost/comment/${id}`, {
          token: localStorage.getItem('memberToken'),
          content
        });
        alert('댓글 등록!!');
        window.location.reload();
      } catch (error) {
        console.error('데이터를 전송하는데 실패했습니다', error);
        alert('데이터를 전송하지 못했습니다.');
      }
    }
  }

  // =======================================================================================

  // 게시글 삭제
  const postDelete = async () => {
    if (loginId === post.writer) {
      try {
        await axios.delete(`http://52.78.131.56:8080/general/post/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('memberToken')}` },
        });
  
        alert('게시글이 성공적으로 삭제되었습니다.');
        window.location.href='/comm_list';
      } catch (error) {
        console.error('게시글 삭제에 실패했습니다', error);
        alert('게시글을 삭제하지 못했습니다.');
      }
    } else {
      alert('삭제 권한이 없습니다.');
    }
  };
  

// 게시글 수정
const handleEdit = () => {
  if (loginId === post.writer) {
    navigate(`/comm_trans/${post.id}`); 
  } else {
    alert('수정 권한이 없습니다.');
  }
};

// ====================================================================

//게시글 저장
const clickSave = async () => {
  setSave(prevSave => {
    const newSaveState = !prevSave;
    // 로컬 스토리지에 저장 상태 업데이트
    localStorage.setItem(`savedPost_${id}`, newSaveState);
    return newSaveState;
  });

  try {
    await axios.post(`http://52.78.131.56:8080/post/save/${id}`, {
      token: localStorage.getItem('memberToken'),
    });
    alert('게시글 저장 완료!!');
  } catch (e) {
    console.error('게시글을 저장하지 못했습니다.', e);
    alert('게시글을 저장하지 못했습니다.');
  }
};


//끄덕임 (좋아요)
const clickLike = async() => {
  try {
    await axios.post(`http://52.78.131.56:8080/post/like/${id}`, {
      token: localStorage.getItem('memberToken'),
    });
    alert('끄덕 끄덕');
    window.location.reload();
  } catch (e) {
    console.error('실패', e);
    alert('끄덕 끄덕 실패😢😢');
  }
}
  
  // =======================================================================================
  return (
    <div className={styles.CommList_container}>
      {/* 왼쪽 */}
      <div className={styles.CommList_left}>
        <h2 className={styles.CommList_left_h2}>커뮤니티</h2>
        <p className={styles.CommList_left_h2}>끄적여봐,<br/>
        깊이 담긴 내면의 이야기들을<br/>
        우리가 끄덕여줄게.</p>
        <p className={styles.CommList_left_p}>고민 끄적끄적</p>
        <Link to='/pro_comm_list' style={{ textDecoration: 'none', color: 'inherit' }}>
          <p className={styles.CommList_left_p2}>전문의 정보 끄적끄적</p>
        </Link>
      </div>

      {/* 오른쪽 부분 */}
      <div className={styles.view_right}>
        <div className={styles.CommList_right_header}>
          <p className={styles.header_p}>홈 <FaAngleRight /> 커뮤니티 <FaAngleRight /> 고민 끄적끄적 <FaAngleRight /></p>
          <p className={styles.header_p2}>모든 끄적임</p> 
        </div>

        {/* 라인 */}
        <div className={styles.view_line}></div>

        {/* 내용 + 댓글 버튼 부분 */}
        <div className={styles.CommList_right}>
          {/* 제목과 북마크 */}
          <div className={styles.view_title}>
            <h4 className={styles.view_h4}>{post.title}</h4>
            { save ?
            <img
            className={styles.main_icon}
            onClick={clickSave}
            src={save
              ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF2SURBVHgB7ZjhTYRAEIUfxAK0A64CYwdnBeYqEDvACuQqsAXs4DrwqOCiDUgJZwGCb3ETARUXZoj+mC/ZQJYhfIHM7LCAYRjGvySaEtw84ZqHnCOBjAo1bqML7EJvCBZtDpSL8QJNalxSdh8SGiOcFPqsQwOniP4pJqqNhmjJpNi4xOC4gcton9V+buPnRJxARhmd9xOC1WHvjszmqjO9a57xiCY8eYbIROu2pvYYCH7yhi2/3xozkX76aqHYL0hFkwmxpxAgE41xNSE6gwDpG838+j8KEyzjk36NG0OjPBVjsu21GPcQolXwv5X1cwUU0FyZerKakg5pwR/iZBPW11eeiz93F21RR75EB2HdkzYmqs0SoiUU+s8hmqJl+1fJ/pRj1TbNwAOUkIoeObaUOmsFO7++7pxzKa+t8CFcQcDcOurents8KCh0HAv0jXTqztmcpHw1d5ixgTFV1AnmoZsGQ3hfAbd6Hdjpx4vsExiGYRg/8A6rfmDhxxpioAAAAABJRU5ErkJggg=='
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADsSURBVHgB7ZThDYIwEIWvxgEcATfACaQbMIIbiBPgBuIIjuAEtRO4AiOwAb4zNFED7WFq5AcvufRIufeR3hWiWf+WGtowxiRKqTvSFQXUtu1Ba1317S08dUeJOQsfsh/a8wGiSApocAxnhEVec86rpFAEgOEGZ1wgMpfzyuAYgBqGtXtA3rgVkGuoWAJIeKL6NtDcLUUAsBEY5m2irLUnhodqpU1OXiEwL3E8haRwSXKlDIH5TWo+FvCEwDwdUzCZi/Z7AM88QiPWiAsJb3KoB033W6jcBeu06yYqR+NL+kYwyD5n3/NuTrMmqwf5GGsmO2z7xQAAAABJRU5ErkJggg=='}
            alt=''
            style={{ cursor: save ? 'default' : 'pointer', opacity: save ? 0.5 : 1 }} //활성화 비활성화를 나타내는 것이라고 함
          />
           :
            <img className={styles.main_icon} 
            onClick={clickSave}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADsSURBVHgB7ZThDYIwEIWvxgEcATfACaQbMIIbiBPgBuIIjuAEtRO4AiOwAb4zNFED7WFq5AcvufRIufeR3hWiWf+WGtowxiRKqTvSFQXUtu1Ba1317S08dUeJOQsfsh/a8wGiSApocAxnhEVec86rpFAEgOEGZ1wgMpfzyuAYgBqGtXtA3rgVkGuoWAJIeKL6NtDcLUUAsBEY5m2irLUnhodqpU1OXiEwL3E8haRwSXKlDIH5TWo+FvCEwDwdUzCZi/Z7AM88QiPWiAsJb3KoB033W6jcBeu06yYqR+NL+kYwyD5n3/NuTrMmqwf5GGsmO2z7xQAAAABJRU5ErkJggg==' alt='' />
          }
         </div>
          
          {/* 닉네임 날짜 수정 삭제 */}
          <div className={styles.view_nick}>
            <img className={styles.view_img} alt='' src='../img/profile.jpg' />
            <p className={styles.view_p}>{post.writer}</p>
            <p className={styles.view_p2}>{post.createDate}</p>
            <p className={styles.view_p3} onClick={handleEdit}>
            수정
            </p>
            <p className={styles.view_p3} onClick={postDelete}>삭제</p>
          </div>

          {/* 내용 부분 */}
          <div className={styles.view_content}>
            {post.content}
          </div>

          {/* 끄덕임 버튼 */}
          <button className={styles.view_btn} onClick={clickLike}>
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFZSURBVHgBzVPRUcMwDLVz/ONsUCYgbFBG6AQtExAmaDsBZQK6QcsEbSagTEAmSMwCCe+5Sk+4aY7P6u6dLOdZepJjY67N7NBH59zYWvvetm2JcAnMETvET977w78TpWn6rcIRUHY16rpONTcxw+YADwUT+EI8zcfEm6EsbAGtbKS9CddUphKeLLSGWWRS3aD3/R9Jzs2YSCcHZ31WlQPFLFqFDQ8DI52M3+jNBbNyMztUeoF/jVpbwX1JWMZqtekZHeQwr3mbJEkOn0fqmfhDn0HyMPjeW+M/UlXVDEnvBA9QuwRyqleokXweKzJR9Z2Om6YxOBhUcAxcIH4GFuD+9ClyQjozc/yXCpkVW8rEb0+KMJMpSKEKKtxivegbLi8HWIM3RViC9wheyVvLsPmpuAVwL8q8kD3fmDk+k7CP+A3trrph2wvzIXlM4EAm23wqPLRnK12C67VfVemwXp4OOFYAAAAASUVORK5CYII=' 
            alt='' className={styles.view_icon}/>
            끄덕임 {post.likeSize}개
          </button>
        </div>

        {/* 댓글 다는 부분 */}
        <div className={styles.view_comment}>
          <input placeholder='댓글을 통해 따뜻한 손길을 건네보세요.' className={styles.view_input} 
          value={content}
          onChange={(e) => setContent(e.target.value)}/>
          <button className={styles.add_btn} onClick={handleComent}>등록하기</button>
        </div>

        {/* 댓글 보이는 부분 */}
        {comments.map((comment , index) => (
        comment.role === 'EXPERT' ? (
    <div key={comment.id} className={styles.view_show_comment}>
       {/* 맨 위의 댓글에만 이미지를 보이게 */}
    {index === 0 && comment.role === 'EXPERT' && (
      <img
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAECSURBVHgB7ZW9DcIwEIXPQJF0TibIBjBC2IANYAQ2ASZgBUYIHR3eADaAdOnCs5QCRbbiM/kp8CdFJ/lOeedz/EIUCARGQHCKpZQrhI0lfXwDYrAgHnshxNaUqOtaIVyIwYx4FJ65QcUVd+Q+4kYw8pI84IpnpkV8B0saQXxnWcdFkDkxcb5qeHmGHT5seYy+wLGvicHctTCO47vuwZZHY1kURVRV1ZX6FE/T9IyQd9WhgRwNlGjgRg50nrl2NYx0R47YTMhY61KEBrSlfo9cQuSAqNDYqVWu77yiIUmS5IWHZadtfjGZsvHz8cUb4WnEwRMP28/7Ep925z5/skDgP/kAvWlK4ab/5gwAAAAASUVORK5CYII='
        alt='Expert Icon'
        className={styles.view_show_icon}
      />
    )}
      <div className={styles.view_nick2}>
        
        <img className={styles.show_comment_img} alt='' src='../img/profile.jpg' />
        <p className={styles.pronick_comment}>{comment.writer}</p>
        <p className={styles.view_p2}>{comment.createDate}</p>
      </div>
        <div className={styles.view_comment}>
          {comment.content}
        </div>
     
    </div>
  ) : (
    <div key={comment.id} className={styles.view_show_comment}>
      <div className={styles.view_nick2}>
        <img className={styles.show_comment_img} alt="" src="../img/profile.jpg" />
        <p className={styles.view_p}>{comment.writer}</p>
        <p className={styles.view_p2}>{comment.createDate}</p>
      </div>
      <div className={styles.view_comment}>
        {comment.content}
      </div>
    </div>
  )
))}

</div>
</div>
  );
}

