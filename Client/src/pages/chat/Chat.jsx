import React from "react";
import "./Chat.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../Api/ChatRequest";
import Conversation from "../../components/Conversation/Conversation";
import { Link } from "react-router-dom";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const [Chats, setChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setsendMessage] = useState(null);
  const [recieveMessage, setrecieveMessage] = useState(null);
  const socket = useRef();

  // ---------- useEffect for socket.io --------------------
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // ---------- useEffect for the sending messages to the socket server ------------------
  useEffect(() => {
    if (sendMessage !== null) socket.current.emit("send-message", sendMessage);
  }, [sendMessage]);

  // ---------- useEffect for receiver messages from the socket server --
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log("the receive-message is:", data);
      setrecieveMessage(data);
    });
  }, []);

  // ---------- getChats method definition ----------------------
  const GetChats = async () => {
    try {
      const { data } = await userChats(user._id);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetChats(); // calling getchat method
  }, [user._id]);

  // --------- check users online or offline status -----
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = OnlineUsers.find((user) => user.userId === chatMember);
    console.log("the online status is: ", online)
    return online ? true : false;
  };

  // --------- JSX SECTION --------------------
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {Chats.map((chat, index) => (
              <div
                key={index}
                onClick={() => setcurrentChat(chat)}
                style={{ cursor: "pointer" }}
              >
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ------- RIGHT SIDE --------- */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to="/home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
          {/* ------------- Calling chatbox components -------- */}
        </div>
        <ChatBox
          chat={currentChat}
          CurrentUser={user._id}
          setsendMessage={setsendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
