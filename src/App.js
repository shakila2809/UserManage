import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import CreateUser from "./components/CreateUser/CreateUser";
import AuthPage from "./components/AuthPage/AuthPage";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import UserList from "./components/UserList/UserList";
import UserSearch from "./components/UserSearch/UserSearch";
import "bootstrap/dist/css/bootstrap.min.css";

// const usersDB = [];

function App() {
  const [user, setUser] = useState([]);
  const [usersDB, setUsersDB] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {}, [usersDB]);
  return (
    <Router>
      
     
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          UserMgmt
        </Link>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Create User
          </Link>

          {usersDB?.length !== 0 && (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/reset" onClick={() => setIsOpen(false)}>
                Reset Password
              </Link>
              <Link to="/list" onClick={() => setIsOpen(false)}>
                User List
              </Link>
              <Link to="/search" onClick={() => setIsOpen(false)}>
                Search
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<CreateUser usersDB={usersDB} setUsersDB={setUsersDB} />}
        />

        <Route
          path="/login"
          element={<AuthPage onLogin={setUser} usersDB={usersDB} />}
        />
        <Route path="/reset" element={<PasswordReset usersDB={usersDB} />} />
        <Route path="/list" element={<UserList usersDB={usersDB} />} />
        <Route path="/search" element={<UserSearch usersDB={usersDB} />} />
      </Routes>
    </Router>
  );
}

export default App;
