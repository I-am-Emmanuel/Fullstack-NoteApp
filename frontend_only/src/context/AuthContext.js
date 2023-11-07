import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
  );
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setError(null); 
  
    try {
      const response = await fetch('/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': e.target.username.value,
          'password': e.target.password.value,
        }),
      });
      const data = await response.json();
      let errorMessage = 'An error occurred during login. You might need to input your details correctly and try again.'
  
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/user-notes');
      } else if(response.status === 401) {
        errorMessage = data.detail
        setError(errorMessage);
        // console.log(errorMessage)
      }
      else {
        setError(errorMessage);
        // console.log(errorMessage)
      }
    } catch (error) {
      console.error('Error during login:', error);
      // setError('An error occurred during login. You might need to input your details correctly and try again.');
    }
  };

 
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  const updateToken = async (e) => {
    let response = await fetch('/auth/jwt/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'refresh': authTokens.refresh
        }),
      });
      let data = await response.json();
      
      if(response.status === 200){
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));

      }
      else{
        logoutUser()
      }
  }

  const contextData = {
    user: user,
    error : error,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
  }, [authTokens, loading])

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
