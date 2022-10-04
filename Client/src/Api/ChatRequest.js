import axios from 'axios';


const API = axios.create({baseURL: 'http://localhost:5000'});


// ------------- creating a new chat ---------------
export const createChat = (senderId, receiverId) => API.post('/chat/create', {senderId, receiverId});

export const userChats = (id) => API.get(`/chat/${id}`);
