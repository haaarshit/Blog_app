import express from "express"
const router = express.Router()
import { register,login, getProfile,getUser,updateUser, createPost, updatePost, allPosts, userPosts, post, logout, deletepost} from "../controller/index.js"

import isAuthenticated from "../middleware/auth.js"


router.route('/user/register').post(register)
router.route('/user/login').put(login)
router.route('/user/logout').delete(isAuthenticated,logout)
// get user profile(current logged in user)
router.route('/user/profile').get(isAuthenticated,getProfile)
// update user 
router.route('/user/profile').put(isAuthenticated,updateUser)
//get other user data
router.route('/user/:id').get(isAuthenticated,getUser)

// posts
router.route('/user/post').post(isAuthenticated,createPost)

// update post
router.route('/user/post/:id').put(isAuthenticated,updatePost)
// update post
router.route('/user/post/:id').delete(isAuthenticated,deletepost)
// fetch specific user posts
router.route('/user/posts/:user_id').get(isAuthenticated,userPosts)
// fetch all posts
router.route('/posts/allposts').get(allPosts)
// fetch single  post
router.route('/posts/:post_id').get(post)


export default router