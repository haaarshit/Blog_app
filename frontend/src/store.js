import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "./reducers/loginReducer"
import userProfile from "./reducers/userProfile"
import postsReducer from "./reducers/postsReducer"
import getUser from "./reducers/getUser"
import singlePost from "./reducers/singlePost"


const store = configureStore({
    reducer:{
        userLogin:loginReducer,
        userProfile:userProfile,
        allposts:postsReducer,
        getUser:getUser,
        singlePost:singlePost
    }
})

export default store