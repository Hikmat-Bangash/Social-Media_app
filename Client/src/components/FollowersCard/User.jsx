import React, { useState } from 'react'
import './FollowersCard.css'
import {useDispatch, useSelector} from 'react-redux'
import { FollowUser, UnFollowUser } from '../../Actions/UpdateUserAction';
import Profile from "../../img/avator.jpg";
import { Link } from 'react-router-dom';
import { createChat } from '../../Api/ChatRequest';

const User = ({person, id}) => {

const {user} = useSelector((state)=>state.AuthReducer.authData);
const dispatch = useDispatch();
const [following, setfollowing] = useState(person.followers.includes(user._id));

// ------------ handleFollow ------------
const handleFollow = () => {
  following ?
  dispatch(UnFollowUser(person._id, user))
  : (
    dispatch(FollowUser(person._id, user))
    )
    setfollowing((pre)=>!pre)

    // --------- for creating chat ------------
    // if(!following){
    //   createChat(person._id, user._id)
    // }

 
}

// ---------- JSX SECTIONS -----------------
  return (
    <div key={id} className="follower">
    <div>
      <Link to={`/profile/${person._id}`}>
        <img style={{objectFit: 'cover'}} src={person.profilePicture?person.profilePicture:Profile} alt="" className='followerImage' />
        </Link>
        <div className="name">
            <span>{person.firstname} {person.lastname}</span>
            <span style={{fontSize: '9px'}}>{person.username}</span>
        </div>
    </div>
    <button className='button fc-button' onClick={handleFollow}>
        {following? "Unfollow" : "Follow"}
    </button>
</div>
  )
}

export default User