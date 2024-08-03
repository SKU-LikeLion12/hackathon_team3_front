import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLogined(loggedIn);
  }, []);

  const login = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLogined(true);
  };

  const logout = () => {
    localStorage.removeItem('memberToken');
    localStorage.removeItem('savedId');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('isLoggedIn');
    setIsLogined(false);
  };

  return (
    <AuthContext.Provider value={{ isLogined, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);