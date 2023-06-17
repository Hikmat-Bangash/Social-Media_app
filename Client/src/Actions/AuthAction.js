import * as AuthApi from '../Api/AuthRequest.js'

// --------- for login section -----------------
export const logIn = (formData) => async(dispatch)=>{
        dispatch({type: "AUTH_START"})
    try {
      const data = await AuthApi.logIn(formData); 
      console.log(data)
        dispatch({type: "AUTH_SUCCESS", data: data.data});
      return data;
    } catch (error) {
      console.log(error); 
      dispatch({type: "AUTH_FAIL"})       
      return error.response;
    }
}

// ------------- for SignUP section --------------------
export const SignUP = (formData) => async(dispatch)=>{
         
    dispatch({type: "AUTH_START"})
try {
  const data  = await AuthApi.SignUP(formData); 
  console.log(data)
  return data;
    // dispatch({type: "AUTH_SUCCESS", data: data});
} catch (error) {
  console.log(error);  
  return error.response;
}
}

// ---------- for logOut section -----

export const logOut = ()=> async (dispatch) =>{
  dispatch({type: "LOGOUT"})
}