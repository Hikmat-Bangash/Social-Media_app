import React, { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../Api/UserInfoRequest'
// import avator from '../../../public/avator.jpg'
import avator from '../../img/avator.jpg'


const Conversation = ({data, currentUserId, online}) => {

const [userData, setuserData] = useState(null)

//    --------- GetUserData method definition --------------
const GetUserData = async ()=>{
  const userId = data.members.find((id)=>id!== currentUserId);
  try {
      const {data} = await getUser(userId);
      setuserData(data);
  } catch (error) {
      console.log(error);
  }
  }

useEffect(() => {
  
// calling GetUserData method
    GetUserData();
}, [])

//    --------- JSX SECTION --------------
  return (
    <>
    <div className="follower conversion">
        <div>
        {online && <div className="online-dot"></div>}
        <img src={userData?.profilePicture? userData.profilePicture : avator } alt="" 
         className='followerImage'
         style={{width: '65px', height: '65px', objectFit: 'cover'}}
        />
  
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span>{online ? "Online" : "Offline"}</span>
          </div> 


        </div>
    </div>
    <hr style={{width: '85%', border: '0.1px solid #ececec'}}/>
    </>
  )
}

export default Conversation