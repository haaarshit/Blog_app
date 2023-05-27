import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User',
     required:true
    },
    heading:{
      type:String,
      required:true,
      min:5
    },
    content:{
        type:String,
        required:true,
        min:15
    },
    avatar:{
        url:{
            type:String
        },
    },
    date:{
        type:Date
    },
}
, 
{ timestamps: true }
)

const PostModel = new mongoose.model("Post",userSchema)


export default PostModel