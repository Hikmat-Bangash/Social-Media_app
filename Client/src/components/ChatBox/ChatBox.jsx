import React, { useState, useEffect } from 'react'
import './ChatBox.css'
import { addMessage, getMessages } from '../../Api/MessageRequest';
import { getUser } from '../../Api/UserInfoRequest';
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { useRef } from 'react';
import avator from '../../img/avator.jpg'


const ChatBox = ({ chat, CurrentUser, setsendMessage, recieveMessage }) => {

  const [userData, setuserData] = useState(null)
  const [Messages, setMessages] = useState([])
  const [newMessage, setnewMessage] = useState("")
  const scroll = useRef();

  //   --------------- fetching data for header -------------
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== CurrentUser);
    const GetUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setuserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    // calling GetUserData method
    if (chat !== null)
      GetUserData();
  }, [chat, CurrentUser])

  //------------ UseEffect for fetching messages ---------
  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);

      } catch (error) {
        console.log(error);
      }
    }

    // --------- calling fecthMessage method definition ------
    if (chat !== null)
      fetchMessages();

  }, [chat])

  // ------------- handleChange method definition ------
  const handleChange = (newMessage) => {
    setnewMessage(newMessage)
  }

  // ------- HandleSend method definition ------
  const HandleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: CurrentUser,
      text: newMessage,
      chatId: chat._id
    }

    //-------- send message to database ------
    try {

      const { data } = await addMessage(message);
      setMessages([...Messages, data]);
      setnewMessage('')

    } catch (error) {
      console.log(error);
    }

    // --------- send message to the socket server --------------------------------
    const receiverId = chat.members.find((id) => id !== CurrentUser);
    setsendMessage({ ...message, receiverId });
  }

  // useEffect for the recieveMessage
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      console.log("the receive message is :", recieveMessage)
      setMessages([...Messages, recieveMessage]);
    }
  }, [recieveMessage])

  // ---------- useeffects for the scroll always to the last message ---
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [Messages])


  // --------- JSX SECTION --------------------
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower chat">
                
                  <img src={userData?.profilePicture ? userData.profilePicture : avator} alt=""
                    className='followerImage'
                    style={{ width: '65px', height: '65px', objectFit: 'cover' }}
                  />

                  <div className="name" style={{ fontSize: '0.8rem' }}>
                    <span>{userData?.firstname} {userData?.lastname}</span>
                </div>
                
              </div>
            </div>


            {/* -------- Chat messages -------- */}
            <div className="chat-body">
              {Messages.map((message) => (
                <>
                  <div ref={scroll} className={message.senderId === CurrentUser ? "message own" : "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* ------ chat sender section -------- */}
            <div className="chat-sender">

              <div>+</div>
              <InputEmoji
                className="Input-icon"
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={HandleSend}>Send</div>
            </div>

          </>
        ) : (
          <span className='chatbox-empty-message'> Tap on a Chat to start Conversation...</span>
        )}
      </div>
    </>
  )
}

export default ChatBox