import React from 'react'
import "./Auth.css";

const SignUp = ({loading, toggle, settoggle, handleChange, SubmitData, error }) => {
    return (
      <div className="a-right">
        <form onSubmit={SubmitData} className="infoForm signup authForm">
          <h3>Sign up</h3>
  
          <div>
            <input
             required
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              onChange={handleChange}
            />
         </div>
          <div>
            <input
             required
              type="email"
              className="infoInput"
              name="username"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
  
          <div>
            <input
             required
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          {error && (
            <span style={{ color: "red" }}>
              *Confirm Password is not matching!
            </span>
          )}
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer", color: 'blue' }}
              onClick={() => settoggle(!toggle)}
            >
              Already have an account. Login!
            </span>
            <button className="button infoButton" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  };

export default SignUp