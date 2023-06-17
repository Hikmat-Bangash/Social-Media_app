import React, { useState, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import Profile from "../../img/avator.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { Posting } from "../../Actions/PostAction";
import axios from "axios";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);
  const [file, setfile] = useState(null)
  const imageRef = useRef();
  const Desc = useRef();
  const {user} = useSelector((state)=>state.AuthReducer.authData);   // to access used id
  const {posts} = useSelector((state)=>state.PostReducer);
  const loading = useSelector((state)=>state.PostReducer.loading);
  const dispatch = useDispatch();

  // console.log(uploading)
  // --------- when we upload image, below method would be called --------
  const onImageChange = (event) => { 
     setfile(event.target.files[0]);   //setting file into the file state in order to access easily

    //  ---- the below code for to show or previewImage that we are going to share -------
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

   // ------------ After creating post, the following states should be reset ----------
   const Reset = ()=>{
    setfile(null);
    Desc.current.value = "";
    setImage(null);
  }

  // ------------ Creating Posts ... --------------------
  const CreatingPost = async () => {
    if (Desc.current.value == "") return window.alert("post cannot be empty!");
    setLoad(true);
  //  below code is to store image in the cloudnary cloud
    
    try {
      if (file != null) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        
  const uploadRes = await axios.post(
    "https://api.cloudinary.com/v1_1/bangash-cloud/image/upload",
    data
    );
    console.log(uploadRes)
    var { url } = uploadRes.data;
  }

  // ----------------------------------------------------------------
    const Postingdata = {
      UserID: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      profilePic: user.profilePicture,
      des: Desc.current.value,
      image: url || ""
    }
    
     console.log(Postingdata)
  dispatch(Posting(Postingdata));
  setLoad(false);

     Reset();
    
  }catch(err){
  console.log(`the cloudnary error is: ${err}`)
  setLoad(false);
  }

  };   // ending point of creatingPost method body

  // ------------------- JSX SECTION --------------------
  return (
    <div className="PostShare">
      
      <img src={user?.profilePicture ? user?.profilePicture : Profile} alt="" /> 
      <div>
        <input type="text" placeholder="What's happening" ref={Desc} />
        <div className="postOptions">

          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option schedule" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>

          <button className="button ps-button" onClick={CreatingPost} disabled={load}>
            {load? "Loading..." : "Share"}
            </button>

          <div style={{display: "none"}}>

            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />

          </div>

        </div>
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={image.image} alt="" />
        </div>

      )}


      </div>
    </div>
  );
};

export default PostShare;
