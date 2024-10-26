// src/components/Dashboard.js
import React from "react";
import { auth, signOut } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {auth.currentUser?.displayName}!</h1>
      <p>Email: {auth.currentUser?.email}</p>
      <img
        src={auth.currentUser?.photoURL}
        alt="User profile"
        style={{ borderRadius: "50%", margin: "20px", width: "100px" }}
      />
      <button onClick={handleSignOut} style={{ padding: "10px 20px" }}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
