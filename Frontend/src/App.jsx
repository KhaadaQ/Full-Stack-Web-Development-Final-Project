import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; 
import CharactersPage from './pages/CharactersPage'; 
import DungeonsPage from './pages/DungeonsPage'; 
import ItemsPage from './pages/ItemsPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> 
        <Route path="/characters" element={<CharactersPage />} /> 
        <Route path="/dungeons" element={<DungeonsPage />} /> 
        <Route path="/items" element={<ItemsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
