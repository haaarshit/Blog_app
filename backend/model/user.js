import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    min: 4,
    unique:false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 4
  },
  avatar: {
    url: {
      type: String
    },

  }
})

const UserModel = new mongoose.model("User", userSchema)


export default UserModel