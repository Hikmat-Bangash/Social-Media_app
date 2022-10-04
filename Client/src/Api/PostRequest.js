import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'});

export const Posting =(data)=>API.post('/post/posting', data);

export const TimeLinePosts = (id)=>API.get(`/post/${id}/timeline`);