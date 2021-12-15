import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import jwt_decode from "jwt-decode";
import { jwtState } from "../atoms/jtwAtom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useRecoilState(userState);
  const [jwt, setJwt] = useRecoilState(jwtState);

  // function parseJwt(token) {
  //     if (!token) { return; }
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace('-', '+').replace('_', '/');
  //     return JSON.parse(window.atob(base64));
  // }

  const history = useHistory();
  const baseUrl = "http://localhost:8000";
  const login = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/api/v1/token/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setJwt(res.data.access);
        setUser(jwt_decode(res.data.access));
        history.push("/");
      })

      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="login__main">
      <ToastContainer />
      <div className="login__container">
        <div className="login__left"></div>
        <div className="login__right">
          <h1 className="head__one"> Sign in and start planning</h1>

          <form>
            <div className="form__body">
              <div className="form__input">
                <label htmlFor=""> Username</label>
                <input
                  type="text"
                  name="username"
                  id="login_username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form__input">
                <label htmlFor=""> Password</label>
                <input
                  type="password"
                  name="password"
                  id="login_password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="form__btn" id="login_button" onClick={login}>
                Sign In
              </button>
              <p className="paragraph">
                Don't have an account? <Link to="/register"> Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
