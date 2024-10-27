import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainDashboard from './MainDashboard';
import Widgets from './Widgets';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <div className="main">
          <MainDashboard />
          <Widgets />
          
        </div>
      </div>
    </div>
  </>
  );
};

export default Dashboard;
