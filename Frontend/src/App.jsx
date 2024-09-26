import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DungeonsPage from './pages/DungeonsPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dungeons" element={<DungeonsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
