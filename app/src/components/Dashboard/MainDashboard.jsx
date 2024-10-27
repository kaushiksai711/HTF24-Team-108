import React from 'react';
import './MainDashboard.css';
import { useNavigate } from 'react-router-dom';
const MainDashboard = () => {
  const navigate=useNavigate();
  return (
    <div className="main-dashboard">
      <div className="action-buttons">
        <button className="action-btn">Create A Chat!</button>
        <button className="action-btn">Connect via Video Calls!</button>
        <button className="action-btn" onClick={()=> navigate('/RhymeGame')} >MiniGames!</button>
      </div>
    </div>
  );
};

export default MainDashboard;
