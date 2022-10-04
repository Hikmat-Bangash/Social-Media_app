import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as USERAPI from "../../Api/UserInfoRequest.js";
import { logOut } from "../../Actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [userProfile, setuserProfile] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
// ----- handleLogout method --------------
const handleLogout = ()=>{
   dispatch(logOut())
}

  // --------- getUserInfo method definition --------------
  const getUserInfo = async () => {
    if (id === user._id) {
      setuserProfile(user);
    } else {
      const UserProfile = await USERAPI.getUser(id);
      setuserProfile(UserProfile);
    }
  };
  // ---- use effect hook used to fetch user record ----
  useEffect(() => {
    getUserInfo();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === id ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{userProfile.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{userProfile.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{userProfile.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
