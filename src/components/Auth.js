import React, { useState } from "react";
import axios from "axios";
import { getUser, loginUser } from "../redux/reducer";
import { connect } from "react-redux";

const Auth = (props) => {
  const [toggle, setToggle] = useState(true);
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const handleEmailInput = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const login = () => {
    axios
      .post("/auth/login", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push(`/dash/${res.data.user_id}`);
      })
      .catch((err) => {
        alert("Email or password incorrect");
      });
  };

  const register = () => {
    axios
      .post("/auth/register", {
        email: emailInput,
        password: passwordInput,
      })
      .then((res) => {
        props.loginUser(res.data);
        props.history.push(`/dash/${res.data.user_id}`);
      })
      .catch((err) => {
        alert("Email already registered, do you want to log in?");
      });
  };

  return (
    <div>
      <h1>{toggle ? "Login" : "Register"}</h1>
      <div>
        <input
          name="email"
          placeholder="email"
          value={emailInput}
          onChange={handleEmailInput}
        />
        <input
          name="password"
          placeholder="password"
          value={passwordInput}
          onChange={handlePasswordInput}
        />
        {toggle ? (
          <>
            <button onClick={login}>Login</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Register
            </button>
          </>
        ) : (
          <>
            <button onClick={register}>Register</button>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, loginUser})(Auth);
