import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "./auth.css";

function AuthPage({ onLogin, usersDB }) {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = usersDB.find((u) => u.emailid === emailid);
    if (!user) return toast.error('username empty');
    if (user.password !== password) return toast.error('Invalid Password');
    toast.success('login successfull')
    onLogin(user);
    setEmailid("")
    setPassword("")
  };

  return (
    <div className="login-container">
       <ToastContainer/>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email ID"
        value={emailid}
        onChange={(e) => setEmailid(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

export default AuthPage;
