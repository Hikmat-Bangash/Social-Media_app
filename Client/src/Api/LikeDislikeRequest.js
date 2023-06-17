import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-app-backend-nine.vercel.app/",
});

export const Like_Dislike_Posts = (id, userid) =>API.put(`/post/${id}/like`, {userid: userid});