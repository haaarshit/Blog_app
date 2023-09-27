import jwt from "jsonwebtoken"
import UserModel from "../model/user.js"

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (token) {
            const { email } = jwt.verify(token, process.env.JWT_Secret)
            const user = await UserModel.findOne({ email }).select({ password: 0 })
            if (user) {
                req.user = user
                next()
            }
            else {
                // if user not found 
                res.status(401).send({ message: "Unautherized" })
            }
        } 
        else {
            // if token not found in cookie
            res.status(401).send({ message: "please login or create id" })
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

export default isAuthenticated