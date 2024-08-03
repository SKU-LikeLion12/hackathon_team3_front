import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
//메인 페이지
import Main1 from './pages/Mainpages/Main1';
import Navbar from './components/Navbar';
import LoginNavbar from './components/LoginNavbar';
import Footer from './components/Footer';
//로그인 페이지
import Login from "./pages/login/Login";
import FindPw from './pages/login/FindPw';
//회원가입 페이지
import ProSignUp from "./pages/Professional/ProSignUp";
import FirstSignup from "./pages/signup/FirstSignup";
import SignUp from "./pages/signup/SignUp";
// 커뮤니티 부분
import { CategoryProvider } from './components/Comm/Comm_context';
import ProCommList from "./pages/Community/Professional/ProCommList";
import ProCommView from "./pages/Community/Professional/ProCommView";
import ProCommWrite from "./pages/Community/Professional/ProCommWrite";
import ProCommTrans from './pages/Community/Professional/ProCommTrans';
import CommWrite from './pages/Community/CommWrite';
import CommList from './pages/Community/CommList';
import CommView from './pages/Community/CommView';
import CommTrans from './pages/Community/CommTrans';
// 마이페이지 부분
import Profile from "./pages/Mypage/Profile";
import MyComment from './pages/Mypage/MyComment';
import MyBookmark from './pages/Mypage/MyBookmark';
import MyPost from "./pages/Mypage/MyPost";
import HospitalMap from "./pages/map/HospitalMap";
import BlueSave from './pages/Mypage/BlueSave';
import StressSave from './pages/Mypage/StressSave'
import AnxietySave from './pages/Mypage/AnxietySave'
//자가진단 페이지
import Blue from './pages/selftest/Blue/Blue';
import BlueResult from './pages/selftest/Blue/BlueResult';
import StressTest from './pages/selftest/stress/StressTest';
import StressResult from './pages/selftest/stress/StressResult';
import Anxiety from './pages/selftest/anxiety/Anxiety';
import AnxietyResult from './pages/selftest/anxiety/AnxietyResult';
//관리자 페이지
import Manager from './pages/manager/Manager';

//로그인 여부 확인 후 url 경로 변경
// import PrivateRoute from './route/PrivateRoute';
import 'pretendard/dist/web/static/pretendard.css';



function App() {

  const location = useLocation();

  // 로그인하기 전 페이지들
  const authPages = ['/login', '/firstsignup', '/signup', '/findPw', '/pro_signup'];

  // 현재 페이지가 로그인한건지 아닌지 
  const showNavbar = authPages.includes(location.pathname);

  return (
    <div className='App' pretendard-font>

       {showNavbar ? <Navbar /> : <LoginNavbar />}
      <CategoryProvider>
        <Routes>
          {/* 로그인 및 회원가입 */}
          <Route path="/login" element={<Login />} />
          <Route path="/firstsignup" element={<FirstSignup />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/findPw" element={<FindPw />} />
          <Route path="/pro_signup" element={<ProSignUp />} />
          {/* 커뮤니티 */}
          <Route path="/comm_list" element={<CommList />} />
          <Route path="/comm_view/:id" element={<CommView />} />
          <Route path="/comm_trans/:id" element={<CommTrans />} /> {/* 게시글 수정 */}
          <Route path="/comm_write" element={<CommWrite />} />
          {/* 전문가가 올린 커뮤니티 */}
          <Route path="/pro_comm_list" element={<ProCommList />} />
          <Route path="/pro_comm_view/:id" element={<ProCommView />} />
          <Route path="/pro_comm_trans/:id" element={<ProCommTrans />} /> {/* 게시글 수정 */}
          <Route path="/pro_comm_write" element={<ProCommWrite />} />
          {/* 마이페이지 */}
          {/* <Route path="/profile/:userId" element={<PrivateRoute  component={Profile}/>} />
          <Route path="/mypost" element={<PrivateRoute  component={MyPost}/>} />
          <Route path="/blueSave" element={<PrivateRoute  component={BlueSave}/>} />
          <Route path="/stressSave" element={<PrivateRoute  component={StressSave}/>} />
          <Route path="/anxietySave" element={<PrivateRoute  component={AnxietySave}/>} />
          <Route path="/hospital_map" element={<PrivateRoute component={HospitalMap} />} /> */}
          <Route path="/member/:id" element={<Profile />} />
          <Route path="/mypost" element={<MyPost/>} /> {/* 작성한 게시글 */}
          <Route path="/mycomment" element={<MyComment/>} />{/* 작성한 댓글 */}
          <Route path="/mybookmark" element={<MyBookmark/>} />{/* 저장한 북마크 */}
          <Route path="/mypost" element={<MyPost/>} />
          <Route path="/blueSave" element={<BlueSave/>} />
          <Route path="/stressSave" element={<StressSave/>} />
          <Route path="/anxietySave" element={<AnxietySave/>} />
          <Route path="/hospital_map" element={<HospitalMap />} />
          {/* 우울증 자가진단 */}
          <Route path='/blue' element={<Blue/>} />
          <Route path='/blueResult' element={<BlueResult/>} />
          {/* 스트레스 자가진단 */}
          <Route path='/StressTest' element={<StressTest />} />
          <Route path='/stressResult' element={<StressResult />} />
          {/* 불안 자가진단 */}
          <Route path='/anxiety' element={<Anxiety />} />
          <Route path='/AnxietyResult' element={<AnxietyResult />} />
          {/* 관리자 페이지 */}
          <Route path='/' element={<Main1 />} />
          <Route path='/manager' element={<Manager />} />
          
          
        </Routes>
      </CategoryProvider>
      <Footer />
    </div>
  );
}

export default App;