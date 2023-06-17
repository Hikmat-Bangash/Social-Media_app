import React, { useEffect} from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux';
import { TimeLinePost } from '../../Actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
let {posts} = useSelector((state)=>state.PostReducer);
const {user} = useSelector((state)=>state.AuthReducer.authData);
const loading = useSelector ((state)=>state.PostReducer.loading);
const param = useParams();


const dispatch = useDispatch();

// ----getting timelineposts method ---------
const GETTING_POSTS = async() =>{

 dispatch(TimeLinePost(user._id))
 
}

useEffect(() => {
  // dispatch(TimeLinePost(user._id))
  GETTING_POSTS();
}, [])

// ---------- showing only loggid user posts while visiting to profile ---------
if(param.id){
   posts = posts.filter((post)  => post.UserID === param.id);
}

  return (
    <div className="Posts">
      {loading ? <div className="loading" style={{width: "100vw", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
         <p style={{fontSize: "20px", color: "gray"}}>Fetching posts...</p>
      </div>
      : 
        posts.map((post)=>{
            return <Post data={post} key={post._id} />
        })
        }
    </div> 
  )
}

export default Posts