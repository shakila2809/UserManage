import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './userlist.css'

function UserList({ usersDB }) {
  const [users, setUsers] = useState(usersDB);

  const [editingUser, setEditingUser] = useState(null);
  const [editedUsers, setEditedUsers] = useState({});

  const navigate = useNavigate();

  const handleEdit = (emailid, key, value) => {
    const user = usersDB.find((u) => u.emailid === emailid);
    if (user) user[key] = value;
    setUsers([...usersDB]);
  };

  const startEditing = (emailid) => {
    setEditingUser(emailid);
    const currentUser = users.find((u) => u.emailid === emailid);
    setEditedUsers((prev) => ({
      ...prev,
      [emailid]: { ...currentUser },
    }));
  };

  const handleFieldChange = (emailid, key, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [emailid]: {
        ...prev[emailid],
        [key]: value,
      },
    }));
  };

  const saveEdit = (emailid) => {
    const updatedData = editedUsers[emailid];
    Object.keys(updatedData).forEach((key) => {
      if (key !== "password") {
        handleEdit(emailid, key, updatedData[key]);
      }
    });
    setEditingUser(null);
  };

  return (
    //   <div>
    //     <h2>User List</h2>
    //     {console.log(users,"usersqq")}
    //     {users.map((u) => (
    //       <div key={u.emailid}>
    //         {Object.keys(u).filter(k => k !== 'password').map((key) => (
    //           <input
    //             key={key}
    //             defaultValue={u[key]}
    //             onBlur={(e) => handleEdit(u.emailid, key, e.target.value)}
    //           />
    //         ))}
    //         <button onClick={() => handleEdit(u.emailid, "password", "newpass123")}>Reset Password</button>

    //       </div>
    //     ))}
    //   </div>
    <div className="userlist-container">
    <h2>User List</h2>
    <table className="user-table">
      <thead>
        <tr>
          {Object.keys(users[0] || {})
            .filter((k) => k !== "password")
            .map((key) => (
              <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => {
          const isEditing = editingUser === u.emailid;
          return (
            <tr key={u.emailid}>
              {Object.keys(u)
                .filter((k) => k !== "password")
                .map((key) => (
                  <td data-label={key} key={key}>
                    {isEditing && key !== "emailid" ? (
                      <input
                        type="text"
                        value={editedUsers[u.emailid]?.[key] || u[key]}
                        onChange={(e) =>
                          handleFieldChange(u.emailid, key, e.target.value)
                        }
                      />
                    ) : (
                      u[key]
                    )}
                  </td>
                ))}
              <td data-label="Actions">
                {isEditing ? (
                  <button className="btn save-btn" onClick={() => saveEdit(u.emailid)}>
                    Save
                  </button>
                ) : (
                  <button className="btn edit-btn" onClick={() => startEditing(u.emailid)}>
                    Edit
                  </button>
                )}
                <button
                  className="btn reset-btn"
                  onClick={() =>
                    navigate("/reset", {
                      state: { userid: u.emailid },
                    })
                  }
                >
                  Reset Password
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  
  

  );
}

export default UserList;
