import React from 'react';
import './Widgets.css';

import { useNavigate } from 'react-router-dom';

const Widgets = () => {
  const navigate=useNavigate();
  return (
    <>
    <div className="widgets">
      <div className="widget-item">My Notes</div>
      <div className="widget-item" onClick={() => navigate('/forum')}>Discussions</div>
      <div className="widget-item">Dictionary</div>
    </div>
    <br/>
    <div className="my-progress" onClick={()=>navigate('/Progress')} ><i class="bi bi-journal-text"></i>MyProgress</div>
    </>
  );
};

export default Widgets;
