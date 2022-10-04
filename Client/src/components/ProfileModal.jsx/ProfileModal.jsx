import { Modal, useMantineTheme } from "@mantine/core";
import React,{ useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { UpdateUserInfo } from "../../Actions/UpdateUserAction.js";

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  const [coverpic, setcoverpic] = useState(null)
  const [profilepic, setprofilepic] = useState(null)
  const [info, setinfo] = useState({
    firstname: "",
    lastname: "",
    worksAt: "",
    livesin: "",
    country: "",
    relationship: "",
    profilePicture: "",
    coverPicture: "",
  })
  const {user} = useSelector((state)=>state.AuthReducer.authData);
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
    setModalOpened(false);
   
  }


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
      size="55%"
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


        <div>
            Profile Image 
            <input type="file" name='profileImg' onChange={(e)=>setprofilepic(e.target.files[0])}/>
            Cover Image
            <input type="file" name="coverImg" onChange={(e)=>setcoverpic(e.target.files[0])} />
        </div>

        <button type="submit" className="button infoButton" onClick={UpdateInfo} >Update</button>
        </div>
      {/* </form> */}
    </Modal>
  );
}

export default ProfileModal;
