import * as PostAPI from '../Api/PostRequest.js'

export const Posting = (PostData)=> async(dispatch)=>{

      dispatch({type: "POSTING_START"});

      try {
        const {data} = await PostAPI.Posting(PostData);
        dispatch({type: "POSTING_SUCCESS", data: data});

      } catch (error) {
         dispatch({type: "POSTING_FAIL"})
         console.log(error)
      }
}

// ------------------- TIMELINE POST ACTION ----------------
export const TimeLinePost = (id)=>async(dispatch)=>{

  dispatch({type: "RetrevingPost_Start"});

  try {
      const {data} = await PostAPI.TimeLinePosts(id);
      dispatch({type: "RetrevingPost_Success", data: data});
  } catch (error) {
      dispatch({type: "RetrevingPost_Fail"});
      console.log(error)
  }
}