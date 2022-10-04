import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5000'})

export const Like_Dislike_Posts = (id, userid) =>API.put(`/post/${id}/like`, {userid: userid});