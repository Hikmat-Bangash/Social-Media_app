import React from "react";
import Cover from "../../img/cover_avator.jpeg";
import Profile from "../../img/avator.jpg";
import "./ProfileCard.css";
import {Link, useRoutes} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi"
import { BiLogOut } from "react-icons/bi"
import { useState } from "react";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { logOut } from "../../Actions/AuthAction";

const ProfileCard = ({location}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
 const {user} = useSelector((state)=>state.AuthReducer.authData);
 const {posts} = useSelector((state)=>state.PostReducer);

  const handleLogout = () => {
    dispatch(logOut());
    // navigate('/')
  }
  
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user?.coverPicture ? user?.coverPicture : Cover} alt="" />
        <img src={user?.profilePicture? user?.profilePicture : Profile} alt="" />
      </div>
      {/* edit and logout */}
      <div className="edit_logout">
        {/* logout */}
        <div className="logout">
          <BiLogOut onClick={handleLogout} style={{ fontSize: "30px", color: "#fca61f", fontWeight: "bolder" }} />
        </div>
        <div onClick={() => setModalOpened(true)}>
          <FiEdit style={{ fontSize: "25px", fontWeight: "bolder", color: "#fca61f" }} />
        </div>

      </div>
      <div className="ProfileName">
        <span>{user?.firstname} {user?.lastname} 
        </span>
        <span>Work: {user?.worksAt ? user?.worksAt : "..."}</span>
        <span>LivesIn: {user?.livesin ? user?.livesin: "..." }</span>
        <span>Country: {user?.country ? user?.country: "..."}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilepage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts?.filter((post) => post?.UserID === user?._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
        {modalOpened ? <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        /> : null}
      </div>
      {location === "profilepage" ? "" : <span>
        <Link to={`/profile/${user?._id}`} style={{textDecoration: "none", color: "inherit"}}>
        My Profile
        </Link>
        </span>}
    </div>
  );
};

export default ProfileCard;
