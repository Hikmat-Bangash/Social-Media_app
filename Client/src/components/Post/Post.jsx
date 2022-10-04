import React from 'react'
import './Post.css'
import Profile from "../../img/avator.jpg";
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Like_Dislike_Posts } from '../../Api/LikeDislikeRequest'
import {format} from 'timeago.js'



const Post = ({data}) => {

  const {user} = useSelector((state)=>state.AuthReducer.authData);
  const [liked, setliked] = useState(data.likes.includes(user._id));
  const [likes, setlikes] = useState(data.likes.length);
  
 
const OnLiked = ()=>{
  setliked((pre)=>!pre)
  Like_Dislike_Posts(data._id, user._id);      // call API function to setlikes and dislike in database

  liked? setlikes((pre)=>pre-1) : setlikes((pre)=>pre+1);
}

// ============== JSX SECTION =============================
  return (
    <div className="Post">

      <div className="detail">
      <div className="profile-icon">
        <img style={{objectFit: 'cover'}} src={data.profilePic? data.profilePic : Profile} alt="" />
           <div className="name_postdata">
            <span style={{marginLeft: "10px"}}><b>{data.firstname} {data.lastname}</b></span> <br/>
            <span style={{marginLeft: "10px", fontSize: "10px"}}>{format(data.createdAt)}</span>
            </div>
        </div>
            <p> {data.des}</p>
        </div>

        <img src={data.image} alt="" />


        <div className="postReact">
            <img src={liked? Heart : NotLike} alt="" onClick={OnLiked} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} likes</span>

    </div>
  )
}

export default Post