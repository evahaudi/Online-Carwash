// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ManagerDashboard from './ManagerDashboard';
import ManagerDirectorDashboard from './ManagerDirectorDashboard ';
import Register from './Register'



const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
        <Route path="/managerdirectorsdashboard" element={<ManagerDirectorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
