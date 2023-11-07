import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from 'react';
import './App.css';
import Header from './components/Header';
import NoteListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import SignUpPage from './pages/SignUpPage'; 
import LoginPage from './pages/LoginPage';  
import SignUpHeader from './components/SignUpHeader'; 
// import PrivateRoute from './util/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  const isSignUpPage = window.location.pathname === '/';
  const isLoginPage = window.location.pathname === '/login';
  const headerComponent = isSignUpPage || isLoginPage ? <SignUpHeader /> : <Header />;
  
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <AuthProvider>
          {headerComponent}
          <Routes>
            <Route path="/user-notes" element={<NoteListPage />} />
            <Route path="note/:id" element={<NotePage />} />
            <Route path="/" element={<SignUpPage />} /> 
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          {isSignUpPage}
          </AuthProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
