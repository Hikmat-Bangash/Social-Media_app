import * as AuthApi from '../Api/AuthRequest.js'

// --------- for login section -----------------
export const logIn = (formData) => async(dispatch)=>{
         
        dispatch({type: "AUTH_START"})
    try {
        const {data} = await AuthApi.logIn(formData); 
        dispatch({type: "AUTH_SUCCESS", data: data});
    } catch (error) {
      console.log(error);  
      dispatch({type: "AUTH_FAIL"})       
    }
}

// ------------- for SignUP section --------------------
export const SignUP = (formData) => async(dispatch)=>{
         
    dispatch({type: "AUTH_START"})
try {
    const {data} = await AuthApi.SignUP(formData); 
    dispatch({type: "AUTH_SUCCESS", data: data});
} catch (error) {
  console.log(error);  
  dispatch({type: "AUTH_FAIL"})       
}
}

// ---------- for logOut section -----

export const logOut = ()=> async (dispatch) =>{
  dispatch({type: "LOGOUT"})
}