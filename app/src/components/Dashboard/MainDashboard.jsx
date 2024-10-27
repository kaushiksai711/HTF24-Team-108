import React from 'react';
import './MainDashboard.css';

const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <div className="action-buttons">
        <button className="action-btn">Create A Chat!</button>
        <button className="action-btn">Connect via Video Calls!</button>
        <button className="action-btn">Schedule Meetings!</button>
      </div>
    </div>
  );
};

export default MainDashboard;
