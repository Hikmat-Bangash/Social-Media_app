import React from 'react'
import './FollowersCard.css'
import { Followers } from '../../Data/FollowersData'
import User from './User'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getAllUsers } from '../../Api/UserInfoRequest'
import { useState } from 'react'

const FollowersCard = () => {
const [persons, setpersons] = useState([])
const {user} = useSelector((state)=>state.AuthReducer.authData);
    // -------- getAllusers ----------------
    const getAllusers = async() =>{
      const {data}  = await getAllUsers();
      setpersons(data);
      console.log(persons)
    }
    // ------- useeffects ----------------
    useEffect(() => {
      getAllusers();
    }, [])
    
// ------------- JSX SECTION -------------
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        {persons.map((person, id)=>{
            if(person._id !== user._id){
                  return  <User person={person} id={id} />
                    
                }
        })}
    </div>
  )
}

export default FollowersCard