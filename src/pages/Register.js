import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";


export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  const baseUrl = "http://localhost:8000";

  const register = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/api/v1/users/`, {
        first_name: firstname,
        last_name: lastname,
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        toast.success(res.data)
        history.push("/login")
      })
      
      .catch((err) => {
        toast.error(err.message)  
      });
  };

  return (
    <div className="register__main">
      <ToastContainer />
      <div className="login__container">
        <div className="login__left"></div>
        <div className="login__right">
          <h1 className="head__one"> Create your Account</h1>
          <form>
            <div className="form__body">
              <div className="form__input">
                <label htmlFor=""> First name</label>
                <input
                  type="text"
                  name="firstname"
                  id="register_firstname"
                  placeholder="Enter Firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor=""> Last name</label>
                <input
                  type="text"
                  name="lastname"
                  id="register_lastname"
                  placeholder="Enter Lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor=""> Username</label>
                <input
                  type="text"
                  name="username"
                  id="register_username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor=""> Email</label>
                <input
                  type="email"
                  name="email"
                  id="register_email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor=""> Password</label>
                <input
                  type="password"
                  name="password"
                  id="register_password"
                  placeholder="Enter Password (at least eight characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="form__btn" id="register_button" onClick={register}>
                Sign up
              </button>
              <p className="paragraph">
                Sign up and proceed to login.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
