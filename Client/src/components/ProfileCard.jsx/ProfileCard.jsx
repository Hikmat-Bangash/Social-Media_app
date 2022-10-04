import React from "react";
import Cover from "../../img/cover_avator.jpeg";
import Profile from "../../img/avator.jpg";
import "./ProfileCard.css";
import {Link} from 'react-router-dom'
import {useSelector}  from 'react-redux';
const ProfileCard = ({location}) => {

 const {user} = useSelector((state)=>state.AuthReducer.authData);
 const {posts} = useSelector((state)=>state.PostReducer);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture ? user.coverPicture : Cover} alt="" />
        <img src={user.profilePicture? user.profilePicture : Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt : "write something about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilepage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post) => post.UserID === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilepage" ? "" : <span>
        <Link to={`/profile/${user._id}`} style={{textDecoration: "none", color: "inherit"}}>
        My Profile
        </Link>
        </span>}
    </div>
  );
};

export default ProfileCard;
