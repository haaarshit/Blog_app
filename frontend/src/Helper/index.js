import axios from "axios"
import { loginFailure, loginSuccess, loginRequest,registerFailure,registerRequest,registerSuccess, logoutFailure, logoutSuccess, logoutRequest } from "../reducers/loginReducer"
import { profileFailure, profileRequest, profileSuccess } from "../reducers/userProfile";
import { postsFailure, postsRequest, postsSuccess } from "../reducers/postsReducer";
import { getUserFailure, getUserRequest, getUserSuccess } from "../reducers/getUser";
import { singlePostFailure, singlePostRequest, singlePostSuccess } from "../reducers/singlePost";

const baseUrl = 'http://localhost:5000'


export const register = (name, email, password, image) =>
 async(dispatch)=>   {

        try {
            dispatch(registerRequest());
            const {data} = await axios.post(`${baseUrl}/user/register`, {
                name: name,
                email: email,
                password: password,
                avatar: image
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
            )
            dispatch(registerSuccess(data.message));
            console.log(data)
        }
        catch (err) {
            dispatch(registerFailure(err.message))
        }

    }

export const login = (email, password) =>
    async (dispatch) => {

        try {
            dispatch(loginRequest())
            const { data } = await axios.put(`${baseUrl}/user/login`, {
                email: email,
                password: password
            }, {

                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
            )

            dispatch(loginSuccess(data.message))
        }
        catch (err) {
            console.log(err)
            dispatch(loginFailure(err.message))
        }

    }


export const profile = ()=>
async(dispatch)=>{
    try {
        dispatch(profileRequest())
        const {data} = await axios.get(`${baseUrl}/user/profile`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        
        dispatch(profileSuccess(data))
    } catch (error) {
        dispatch(profileFailure(error.message))
    }

}

export const updateProfile = async(avatar,password)=>{
    try {
        const {data} = await axios.put(`${baseUrl}/user/profile`,{
            avatar:avatar,
            password:password
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(data)
    } catch (error) {
        console.log(err)
    }

}

export const logout = ()=>
async(dispatch)=>{
    try {
        dispatch(logoutRequest())
        const {data} = await axios.delete(`${baseUrl}/user/logout`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailure(error.message))
    }
}


export const createPost = async(heading,content,avatar)=>{
    
    try {
        const {data} = await axios.post(`${baseUrl}/user/post`,{
            heading:heading,
            content:content,
            avatar:avatar
        }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(data)
    } catch (error) {

    }
}


export const deletePost = async(id)=>{
  try {
        const {data} = await axios.delete(`${baseUrl}/user/post/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(data)
    } catch (error) {
    }
}

// get all posts
export const getPosts = ()=>
async(dispatch)=>{
    try {
        dispatch(postsRequest())
        const {data} = await axios.get(`${baseUrl}/posts/allposts`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log( data.posts)
        dispatch(postsSuccess(data))
    } catch (error) {
        dispatch(postsFailure(error.message))
    }
}

// get post data
export const getPost = (id)=>
async(dispatch)=>{
    try {
        dispatch(singlePostRequest())
        const {data} = await axios.get(`${baseUrl}/posts/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        dispatch(singlePostSuccess(data))
    } catch (error) {
        dispatch(singlePostFailure(error.message))
    }
}

// get user
export const getUser = (id)=>
async(dispatch)=>{
    try {
        dispatch(getUserRequest())
        const {data} = await axios.get(`${baseUrl}/user/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log( data)
        dispatch(getUserSuccess(data))
    } catch (error) {
        dispatch(getUserFailure(error.message))
    }
}