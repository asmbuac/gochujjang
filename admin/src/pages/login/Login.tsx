import { useState } from "react";
import "./login.scss";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/authSlice";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = async (
    dispatch: Dispatch,
    username: string,
    password: string
  ) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username,
        password,
      });
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(dispatch, username, password);
  };

  return (
    <div className="login">
      <img src="/src/assets/logo.png" alt="" />
      <div className="wrapper">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            required
            placeholder="Username or Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
