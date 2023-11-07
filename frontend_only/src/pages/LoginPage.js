import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const { loginUser, error } = useContext(AuthContext);
  
  return (
    <div className="login-page">
      <h1>Log In</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
