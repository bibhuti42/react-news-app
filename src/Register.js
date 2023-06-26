import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Register (){

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user-info')){
      navigate('/home');
    }
  },[])

  async function formSubmit(e){
    e.preventDefault();
    let data = {name, email, password}
    
    let result = await fetch("http://localhost:8000/api/register",{
      method:"POST",
      headers: {
        "Content-type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(data)
    });

    let resp = await result.json();

    localStorage.setItem('user-info', JSON.stringify(resp));
    
    navigate('/home');

  }
  
    return (
      <div style={{width: "500px", margin: "50px auto", border: "1px solid #ccc", padding: "30px", borderRadius: "10px"}} className="col-xs-6">
        <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <input type="text" className="form-control" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
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
          <button type="submit" onClick={formSubmit} className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          
          Already registered <Link to='/login'>Sign in?</Link>
        </p>
      </form>
      </div>
      
    )
}