import React, { useState, useEffect } from "react";
import './passreset.css'
import {useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
function PasswordReset({usersDB}) {
    const [emailid, setEmailid] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const location = useLocation();
    console.log(location,"location");
    const handleReset = () => {
      const user = usersDB.find((u) => u.emailid === emailid);
      if (!user) return alert("User not found");
      if (user.password !== oldPassword) return  toast.error("Incorrect old password");
      user.password = newPassword;
      toast.success("Password updated");
      setEmailid('')
      setOldPassword('')
      setNewPassword('')
    };

    useEffect(()=>{
        setEmailid(location.state?.userid)
    },[location])
  
    return (
    
    <div className="reset-container">
      <ToastContainer/>
  <h2>Reset Password</h2>
  <input
    type="email"
    placeholder="Email ID"
    onChange={(e) => setEmailid(e.target.value)}
    value={emailid}
    className="input-field"
  />
  <input
    type="password"
    placeholder="Old Password"
    onChange={(e) => setOldPassword(e.target.value)}
    value={oldPassword}
    className="input-field"
  />
  <input
    type="password"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="input-field"
  />
  <button onClick={handleReset} className="reset-button">
    Reset
  </button>
</div>

    );
  }

  export default PasswordReset;