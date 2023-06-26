import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user-info')){
      navigate('/home');
    }
  },[])

  async function login(e){
    e.preventDefault();
    const item = {email, password};

    let result = await fetch("http://localhost:8000/api/login",{
      method: "POST",
      headers: {
        "Content-type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(item)
    });

    let resp = await result.json();
    if(resp.email){
      localStorage.setItem('user-info', JSON.stringify(resp));
      navigate('/home');
    } else {
      alert(resp.error)
    }
  }
  return (
    <div style={{width: "500px", margin: "50px auto", border: "1px solid #ccc", padding: "30px", borderRadius: "10px"}}>
      <form>
      <h3>Login</h3>
      
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <Link to='/register'>Sign up?</Link>
      </p>
    </form>
    </div> 
  )
}