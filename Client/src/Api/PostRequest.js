import axios from 'axios'

const API = axios.create({
  baseURL: "https://social-media-app-backend-nine.vercel.app/",
});

export const Posting =(data)=>API.post('/post/posting', data);

export const TimeLinePosts = (id)=>API.get(`/post/${id}/timeline`);