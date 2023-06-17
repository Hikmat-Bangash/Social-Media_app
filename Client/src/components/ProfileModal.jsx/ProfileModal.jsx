import { Modal, useMantineTheme } from "@mantine/core";
import React,{ useEffect, useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { UpdateUserInfo } from "../../Actions/UpdateUserAction.js";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const [Load, setLoad] = useState(false)

  const [coverpic, setcoverpic] = useState(null)
  const [profilepic, setprofilepic] = useState(null);
  const [screenWidth, setScreenWidth] = useState();
  const {user} = useSelector((state)=>state.AuthReducer.authData);
  const [info, setinfo] = useState({
    firstname: "",
    lastname: "",
    worksAt: "",
    livesin: "",
    country: "",
    relationship: "",
    profilePicture: user?.profilePicture,
    coverPicture: user?.coverPicture,
  })
  const param = useParams();
 const dispatch = useDispatch();


  // --------- OnChange method defintion -----------
  const handlerOnchange = (e)=>{
    setinfo((state)=>{
      return{
        ...state,
        [e.target.name]: e.target.value
      }
    })
  }

  // --------- UpdateInfo is the method to update the user info ------
  const UpdateInfo = async ()=>{
  setLoad(true)
   // ----------------- Uploading coverpic on cloudnary ----------------
 if(coverpic != null){
  const data = new FormData();
  data.append("file", coverpic);
  data.append("upload_preset", "uploads");
  try {
    
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/bangash-cloud/image/upload",
      data
    );
  console.log(uploadRes)
    const { url } = uploadRes.data;
    info.coverPicture = url;
  }
  catch(error){
  console.log(error);
  }
}
// ------------- uploading profile pic on cloudnary ---------------
 if(profilepic != null){
  const data = new FormData();
  data.append("file", profilepic);
  data.append("upload_preset", "uploads");
  try {
    
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/bangash-cloud/image/upload",
      data
    );
  console.log(uploadRes)
    const { url } = uploadRes.data;
    info.profilePicture = url;
  }
  catch(error){
  console.log(error);
  }
 }

  dispatch(UpdateUserInfo(param.id, info))
    console.log(info)
    setLoad(false)
    setModalOpened(false);
   
  }

  useEffect(() => {
    // Update the screenWidth state on window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine the size value based on the screen width
  const getSizeValue = () => {
    if (screenWidth <= 500) {
      return '100%';
    } else {
      return '70%';
    }
  };

  // ----------------- JSX SECTION --------------
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size={getSizeValue}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      {/* <form onsubmit={UpdateInfo} className="infoForm"> */}
      <div className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handlerOnchange}
            value={info.firstname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handlerOnchange}
            value={info.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handlerOnchange}
            value={info.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
            onChange={handlerOnchange}
            value={info.livesin}
          />
        </div>

        <div>

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handlerOnchange}
            value={info.country}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            onChange={handlerOnchange}
            name="relationship"
            value={info.relationship}
          />
        </div>


        <div style={{display: "flex", flexDirection: "column"}}>
          <div className="prflPiccc" style={{ }}>
            Profile Image
            <input type="file" name='profileImg' onChange={(e) => setprofilepic(e.target.files[0])} />
          </div>

           <div className="cvrPic">
            Cover Image
            <input type="file" name="coverImg" onChange={(e) => setcoverpic(e.target.files[0])} />
          </div>
        </div>

        <button type="submit" className="button infoButton" onClick={UpdateInfo} disabled={Load} >Update</button>
        </div>
      {/* </form> */}
    </Modal>
  );
}

export default ProfileModal;
