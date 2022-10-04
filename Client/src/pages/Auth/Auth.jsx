import React from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useState } from "react";
import LogIn from "./Login";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { logIn, SignUP } from "../../Actions/AuthAction";

const Auth = () => {
  //----------- Custom state management using useState------------
  //for register form data
  const [data, setdata] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
  });
  // for login form data
 const [login, setlogin] = useState({
   username: "",password: "",
 })
  const [toggle, settoggle] = useState(true);
  // const [error, seterror] = useState(false);
// -----------------------------------------------
//-------- Fetching REDUX STATE MANAGEMENT --------------------
 const error = useSelector((state)=>state.AuthReducer.error);
 const loading = useSelector((state)=>state.AuthReducer.loading);
 console.log(error)
 const dispatch = useDispatch();


//  ------------ Redux State END --------------------
  //============ OnchangeHandling =============
  const handleChange = (event) => {
    setdata((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  //------------- Login handlechange --------------------------------
  const LoginhandleChange = (event) => {
  setlogin({...login, [event.target.name]: event.target.value});
}
  //==================== SUBMIT DATA OR REGISTERING OR SIGNING INTO THE APP =============
  const SubmitData = (e) => {
    e.preventDefault();
    //------- for sign up sectio -----------------
    if (!toggle) {
      console.log("sign up section");
      if (data.password !== data.confirmpass){ 
        // seterror(true);
        console.log("confirm password is not matching")
    } else {
      console.log(data);
      // seterror(false);
      settoggle(!toggle);
      dispatch(SignUP(data));
    }
  }
  //------ for login section --------------------
  else{
       console.log("login section");
      //  if(login.username !== data.username || login.password !== data.password){
      //   seterror(true);
      //   console.log(login);
      //  }else{
      //    seterror(false);
      //    console.log("logged in successfully");
      //    dispatch(logIn(login));
      //  }
      dispatch(logIn(login));

  }
  };

  // ================== JSX SECTION =============
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>HKB Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {toggle ? (
        <LogIn
          toggle={toggle}
          settoggle={settoggle}
          LoginhandleChange={LoginhandleChange}
          SubmitData={SubmitData}
          error={error}
          login={login}
          setlogin={setlogin}
          loading={loading}
        />
      ) : (
        <SignUp
          toggle={toggle}
          settoggle={settoggle}
          handleChange={handleChange}
          SubmitData={SubmitData}
          error={error}
          loading={loading}
        />
      )}
    </div>
  );
};

// --------------- SIGNIN SECTION --------------------
// const LogIn = ({ toggle, settoggle, LoginhandleChange, SubmitData, login, setlogin, error }) => {
//   return (
//     <div className="a-right">
//       <form onSubmit={SubmitData} className="infoForm authForm">
//         <h3>Log In</h3>

//         <div>
//           <input
//            required
//             type="text"
//             placeholder="Email"
//             className="infoInput"
//             name="email"
//             onChange={LoginhandleChange}
//           />
//         </div>

//         <div>
//           <input
//           required
//             type="password"
//             className="infoInput"
//             placeholder="Password"
//             name="password"
//             onChange={LoginhandleChange}
//           />
//         </div>
//         {error && <span style={{color: "red"}}> *Invalid Credentials</span>}
//         <div>
//           <span
//             style={{ fontSize: "12px", cursor: "pointer" }}
//             onClick={() => settoggle(!toggle)}
//           >
//             Don't have an account Sign up
//           </span>
//           <button className="button infoButton" type="submit">
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// --------- SIGN UP SECTION --------------------
// const SignUp = ({ toggle, settoggle, handleChange, SubmitData, error }) => {
//   return (
//     <div className="a-right">
//       <form onSubmit={SubmitData} className="infoForm authForm">
//         <h3>Sign up</h3>

//         <div>
//           <input
//            required
//             type="text"
//             placeholder="First Name"
//             className="infoInput"
//             name="firstname"
//             onChange={handleChange}
//           />
//           <input
//            required
//             type="text"
//             placeholder="Last Name"
//             className="infoInput"
//             name="lastname"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <input
//            required
//             type="email"
//             className="infoInput"
//             name="email"
//             placeholder="email"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <input
//            required
//             type="password"
//             className="infoInput"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//           />
//           <input
//            required
//             type="password"
//             className="infoInput"
//             name="confirmpass"
//             placeholder="Confirm Password"
//             onChange={handleChange}
//           />
//         </div>
//         {error && (
//           <span style={{ color: "red" }}>
//             *Confirm Password is not matching!
//           </span>
//         )}
//         <div>
//           <span
//             style={{ fontSize: "12px", cursor: "pointer" }}
//             onClick={() => settoggle(!toggle)}
//           >
//             Already have an account. Login!
//           </span>
//           <button className="button infoButton" type="submit">
//             Signup
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default Auth;
