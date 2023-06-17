import axios from 'axios';

const API = axios.create({
  baseURL: "https://social-media-app-backend-nine.vercel.app/",
  // baseURL: "https://localhost:5000/"
});
// -------- for LogIn ------

export const logIn = (formData)=>API.post('auth/login', formData)
// ----- for sign up or REGISTER USER -----------------------------
export const SignUP = (formData)=>API.post('auth/register', formData)
