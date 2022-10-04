const PostReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "POSTING_START":
      return { ...state, loading: true, error: false, uploading: true };

    case "POSTING_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts], uploading: false, loading: false, error: false,
      };

    case "POSTING_FAIL":
      return { ...state, loading: false, error: true };

      // ------------- timeline post reducers --------------------
      case "RetrevingPost_Start":
        return { ...state, loading: true, error: false };

      case "RetrevingPost_Success":
        return { ...state, posts: action.data, loading: false, error: false };
        
      case "RetrevingPost_Fail":
        return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default PostReducer;
