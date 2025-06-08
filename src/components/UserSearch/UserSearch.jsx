import React, { useState, useEffect } from "react";
import './search.css'

function UserSearch({ usersDB }) {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersDB);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q === "") {
      setFilteredUsers(usersDB);
    } else {
      setFilteredUsers(
        usersDB.filter((u) => u.emailid.toLowerCase().includes(q))
      );
    }
  }, [query, usersDB]);

  return (
    <div className="search-container">
      <h2>User Search</h2>
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search by email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>

      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>Email ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.emailid}>
                  <td>{u.emailid}</td>
                  <td>{u.fname}</td>
                  <td>{u.lname}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-result">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserSearch;
