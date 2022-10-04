

const AuthReducer = (state = { authData: null, loading: false, error: false, updating: false }, action) => {

    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: false };

        case 'AUTH_SUCCESS':
            localStorage.setItem("Profile", JSON.stringify({ ...action?.data })); // string in localStorage
            return { ...state, authData: action.data, loading: false, error: false };

        case 'AUTH_FAIL':
            return { ...state, loading: false, error: true };

        // ---------------- Updating User info and then save ----------------------
        case "UPDATING_START":
            return { ...state, loading: false, error: false, updating: true };

        case "UPDATING_SUCCESS":
            localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, updating: false, errora: false }

        case "UPDATING_FAIL":
            return { ...state, loading: false, errora: true, updating: false };


        // ------------------- FOLLOW USER ----------------
        case "FollowUser":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } } }

        // ------------------- FOLLOW USER ----------------
        case "UnFollowUser":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId !== action.data)] } } }


        //--------------- LOGOUT CASE ---------------- 
        case "LOGOUT":
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: false };

        default:
            return state;
    }
};

export default AuthReducer;