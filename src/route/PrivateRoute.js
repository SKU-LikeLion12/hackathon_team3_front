import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const [isLogined, setIsLogined] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const showLoginAlert = () => {
    alert('로그인이 필요한 서비스입니다.');
    navigate('/login');
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      setIsLogined(loggedIn);
      setLoading(false);
    };

    checkLoginStatus();
  }, [isLogined]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogined ? <Component /> : showLoginAlert();
};

export default PrivateRoute;