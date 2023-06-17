import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-app-backend-nine.vercel.app/",
});

export const getUser=(id) =>API.get(`/user/${id}`);

export const UpdateUser = (id, formdata)=>API.put(`/user/update/${id}`, formdata);

// ----------- get all users records    --------------------
export const getAllUsers = () =>API.get(`/user`);

// ------------- FOLLOW AND UNFOLLOW --------------------
export const FollowUser = (id, data) =>API.put(`/user/${id}/follow`, data);

// ------------- UN-FOLLOW AND UNFOLLOW --------------------
export const UnFollowUser = (id, data) =>API.put(`/user/${id}/unfollow`, data);

