// src/components/Login.js
import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
      auth.currentUser=result.user;
      navigate("/user-profile");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login / Sign Up</h1>
      <button onClick={handleGoogleSignIn} style={{ padding: "10px 20px" }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
