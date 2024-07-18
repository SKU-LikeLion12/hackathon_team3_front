import Login from "./pages/Login/Login";
import { Routes, Route } from 'react-router-dom';
import SignUp from "./pages/Signup/SignUp";
import FindPw from './pages/Login/FindPw';
import ProSignUp from "./pages/Professional/ProSignUp";
import FirstSignup from "./pages/Signup/FirstSignup";
import CommWrite from './pages/Community/CommWrite';
import CommList from './pages/Community/CommList';
import CommView from './pages/Community/CommView';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CategoryProvider } from './components/Comm/Comm_context';
import ProCommList from "./pages/Community/Professional/ProCommList";
import ProCommView from "./pages/Community/Professional/ProCommView";
import ProCommWrite from "./pages/Community/Professional/ProCommWrite";
import Profile from "./pages/Mypage/Profile";
import MyPost from "./pages/Mypage/MyPost";
import HospitalMap from "./pages/Mypage/HospitalMap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main1 from './pages/Mainpages/Main1';
import Blue from './pages/selftest/Blue/Blue';
import Blue2 from './pages/selftest/Blue/Blue2';
import Blue3 from './pages/selftest/Blue/Blue3';
import Blue4 from './pages/selftest/Blue/Blue4';
import BlueResult from './pages/selftest/Blue/BlueResult';
import StressTest from './pages/selftest/stress/StressTest';
import StressTest2 from './pages/selftest/stress/StressTest2';
import StressResult from './pages/selftest/stress/StressResult';
import Anxiety from './pages/selftest/anxiety/Anxiety';
import Anxiety2 from './pages/selftest/anxiety/Anxiety2';
import Anxiety3 from './pages/selftest/anxiety/Anxiety3';
import Anxiety4 from './pages/selftest/anxiety/Anxiety4';
import Anxiety5 from './pages/selftest/anxiety/Anxiety5';
import AnxietyResult from './pages/selftest/anxiety/AnxietyResult';
import Manager from './pages/manager/Manager';

function App() {
  return (
    <div className='App'>
      <Navbar />
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
          <Route path="/comm_view" element={<CommView />} />
          <Route path="/comm_write" element={<CommWrite />} />
          {/* 전문가가 올린 커뮤니티 */}
          <Route path="/pro_comm_list" element={<ProCommList />} />
          <Route path="/pro_comm_view" element={<ProCommView />} />
          <Route path="/pro_comm_write" element={<ProCommWrite />} />
          {/* 마이페이지 */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/hospital_map" element={<HospitalMap />} />
          {/* 우울증 자가진단 */}
          <Route path='/blue' element={<Blue />} />
          <Route path='/blue2' element={<Blue2 />} />
          <Route path='/blue3' element={<Blue3 />} />
          <Route path='/blue4' element={<Blue4 />} />
          <Route path='/blueResult' element={<BlueResult />} />
          {/* 스트레스 자가진단 */}
          <Route path='/StressTest' element={<StressTest />} />
          <Route path='/StressTest2' element={<StressTest2 />} />
          <Route path='/stressResult' element={<StressResult />} />
          {/* 불안 자가진단 */}
          <Route path='/anxiety' element={<Anxiety />} />
          <Route path='/anxiety2' element={<Anxiety2 />} />
          <Route path='/anxiety3' element={<Anxiety3 />} />
          <Route path='/anxiety4' element={<Anxiety4 />} />
          <Route path='/anxiety5' element={<Anxiety5 />} />
          <Route path='/AnxietyResult' element={<AnxietyResult />} />
          {/* 관리자 페이지 */}
          <Route path='/manager' element={<Main1 />} />
          <Route path='/' element={<Manager />} />
        </Routes>
      </CategoryProvider>
      <Footer />
    </div>
  );
}

export default App;
