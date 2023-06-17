import axios from 'axios';


const API = axios.create({
  baseURL: "https://social-media-app-backend-nine.vercel.app/",
});


// ------------- creating a new chat ---------------
export const createChat = (senderId, receiverId) => API.post('/chat/create', {senderId, receiverId});

export const userChats = (id) => API.get(`/chat/${id}`);
