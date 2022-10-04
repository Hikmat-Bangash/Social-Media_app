import React from 'react'
import "./Auth.css";


const LogIn = ({loading, toggle, settoggle, LoginhandleChange, SubmitData, login, setlogin, error }) => {
    
  return (
      <div className="a-right">
        <form onSubmit={SubmitData} className="infoForm authForm">
          <h3>Log In</h3>
  
          <div>
            <input
             required
              type="email"
              placeholder="Email"
              className="infoInput"
              name="username"
              onChange={LoginhandleChange}
            />
          </div>
  
          <div>
            <input
            required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={LoginhandleChange}
            />
          </div>
          {error && <span style={{color: "red"}}> *Invalid Credentials</span>}
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => settoggle(!toggle)}
            >
              Don't have an account Sign up
            </span>
            <button className="button infoButton" type="submit" disabled={loading}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  };

export default LogIn