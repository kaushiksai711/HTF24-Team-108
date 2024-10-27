import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate=useNavigate();
  return (
    <div className="sidebar">
      <button className="create-btn">+Create</button>
      <button className="menu-btn-top">See LeaderBoard</button>
      <button className="menu-btn-top" onClick={()=>navigate('/Translator')}>Translate My Query</button>
      <button className="menu-btn-bottom"><i class="bi bi-translate"></i>Translate?</button>
      <button className="menu-btn-bottom"><i class="bi bi-robot"></i>Refer Chatbot</button>
      <button className="menu-btn-bottom"><i class="bi bi-gear-wide-connected"></i>Settings</button>
    </div>
  );
};

export default Sidebar;
