// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Forum from "./components/Forum.jsx";
import TranslationApp from "./components/TranslationApp.jsx";

import UserProfileForm from './components/UserDetails.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-profile" element={<UserProfileForm />} />
        <Route path='/forum' element= {<Forum/>}></Route>
        <Route path='/Translator' element={<TranslationApp/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
