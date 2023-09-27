import UserModel from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import PostModel from "../model/post.js"

// User
// register controller
export const register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body
        const salt = await bcrypt.genSalt(10)
        const haspass = await bcrypt.hash(password, salt)

        const user = await new UserModel({
            name: name,
            email: email,
            password: haspass,
            avatar: {
                url: avatar
            }
        })

        await user.save()
        
        const token = jwt.sign({ email: user.email, password: user.password }, process.env.JWT_Secret)
      
        return res.status(200).cookie("token", token).json({
            success: true,
            message: "User successfully registered"
        })

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
// login controller
export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await UserModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const hashPass = user.password
        const isValid = await bcrypt.compare(password, hashPass);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }
        const token = jwt.sign({ email: user.email, password: user.password }, process.env.JWT_Secret)
        return res.status(200).cookie("token", token).json({
            success: true,
            message: "login success full"
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// login controller
export const logout = async (req, res) => {
    try {
        const token = null
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now())
        }).json({
            success: true,
            message: "Logout succesfull..."
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// getuser data
export const getProfile = async (req, res) => {
    const user = req.user
    const posts = await PostModel.find({ user: user._id }).sort({ createdAt: -1 })

    return res.status(200).json({
        user: user,
        posts: posts
    })
}

// get any user data
export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserModel.findOne({ _id: id }).select({ password: 0 })
        const posts = await PostModel.find({ user: id }).sort({ createdAt: -1 })
        if (user) {
            return res.status(200).json({
                success: true,
                user: user,
                posts: posts
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            message: err.message,
            success: false
        })
    }
}


// update user
export const updateUser = async (req, res) => {
    const user = req.user
    const id = user._id
    if (!user) {
        return res.status(401).json({
            message: "User not found",
            success: false
        })
    }
    const updateUser = await UserModel.findOne({ _id: id })
    try {
        const { avatar, password } = req.body
        if (avatar) {
            updateUser.avatar.url = avatar
        }
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const haspass = await bcrypt.hash(password, salt)
            updateUser.password = haspass
        }
        await updateUser.save()
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updateUser
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// Post
// create new post
export const createPost = async (req, res) => {

    try {
        const { heading, content, avatar } = req.body

        const newPost = new PostModel({
            user: req.user._id,
            heading: heading,
            content: content,
            avatar: {
                url: avatar
            },
            date: new Date().toDateString()
        })
        await newPost.save()
        return res.status(201).json({
            success: true,
            message: "Succesfully posted",
            post: newPost
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

// update post
export const updatePost = async (req, res) => {
    const { id } = req.params
    const user_id = req.user._id
    try {

        const post = await PostModel.findOne({ _id: id });
        if (!post) {
            return res.status(400).json({
                message: "Post Not found"
            })
        }
        if (user_id === post.user) {
            const { heading, content, avatar } = req.body
            if (heading) {
                post.heading = heading
            }
            if (content) {
                post.content = content
            }
            if (avatar) {
                post.avatar = avatar
            }
            await post.save()
            res.status(200).json({
                message: "post updatetd",
                post: post
            })
        }
        else{
            res.status(401).json({
            message:"Can't update this post"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

// deletepost
export const deletepost = async (req, res) => {
    const { id } = req.params
    try {
        const data = await PostModel.deleteOne({ _id: id })
        res.status(200).json({
            message: "post deleted",
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

// get all post
export const allPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({}).sort({ createdAt: -1 })
        res.status(200).json({
            posts: posts
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}
// get post by id
export const post = async (req, res) => {
    const { post_id } = req.params
    try {
        const post = await PostModel.findOne({ _id: post_id })
        const user = await UserModel.findOne({ _id: post.user })
        res.status(200).json({
            post: post,
            user: user
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
// get any user posts
export const userPosts = async (req, res) => {

    try {
        const { user_id } = req.params
        const posts = await PostModel.find({ user: user_id })
        res.status(200).json({
            posts: posts
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

