import React, { useState, useEffect } from "react";
import "./createUser.css";
import { ToastContainer, toast } from 'react-toastify';
function CreateUser({ usersDB, setUsersDB }) {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    emailid: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usersDB.some((u) => u.emailid === form.emailid)) {
      // alert("User already exists");
      setForm({
        fname: "",
        lname: "",
        emailid: "",
        phone: "",
      })
      toast.error("User already exists");
      return;
    }

    setUsersDB([...usersDB, { ...form, password: "default123" }]);
    toast.success("User created with default password: default123");
    setForm({
      fname: "",
      lname: "",
      emailid: "",
      phone: "",
    })
    // alert("User created with default password: default123");
    setForm({ fname: "", lname: "", emailid: "", phone: "" });
  };
  return (
    <div>
      <ToastContainer />
      <div className="form-container">
        <h2>Create User</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {Object.keys(form).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                placeholder={`Enter ${key}`}
                onChange={handleChange}
                value={form[key]}
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
