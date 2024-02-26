import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function CreateAcc() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
 const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      return false;
    }
    if (!nameRef.current.value) {
      alert("Name is empty");
      return false;
    }
    if (passwordRef.current.value.length < 6) {
      alert("Password must be more than 6 characters");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const users = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        username: nameRef.current.value,
      };
      fetch("https://strapi-store-server.onrender.com/api/auth/local/register", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(users),
      })
        .then((res) => res.json())
        .then((json) => {
        navigate('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="input-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p>Username</p>
        </label>
        <input type="text" id="username" ref={nameRef} />

        <label htmlFor="email">
          <p>Email</p>
        </label>
        <input type="email" id="email" ref={emailRef} />

        <label htmlFor="password">
          <p>Password</p>
        </label>
        <input type="password" id="password" ref={passwordRef} />
        <br />
        <input className="btnLogin" type="submit" value="REGISTER" />
        <br />
        <span>
          Not a member yet? <NavLink to="/">Login</NavLink>
        </span>
      </form>
    </div>
  );
}
