import React, { useRef } from 'react'
import './index.css'
import { NavLink , useNavigate} from 'react-router-dom'

export default function Singin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const validateEmail = (email) => {
    const navigate =useNavigate();
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
        identifier: emailRef.current.value,
        password: passwordRef.current.value,
      };
      fetch("https://strapi-store-server.onrender.com/api/auth/local", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(users),
      })
        .then((res) => res.json())
        .then((json) => {
        navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
        
         <div className='input-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <p ref={emailRef}>Email</p>
        </label>
        <input type="email" id="email" />

        <label htmlFor="password">
          <p ref={passwordRef}>Password</p>
        </label>
        <input type="password" id="password" /><br />
        <input className='btnLogin' type="button" value="LOGIN" /><br />
        <input className='btnAcc' type="button" value="GUEST USER" /><br />
        <span >Not a member yet? <NavLink to='/singin'>Register</NavLink></span>

      </form>
    </div>
       
 
  )
}