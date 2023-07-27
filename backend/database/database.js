import mongoose  from "mongoose";

const connectdb = ()=>{
    mongoose.connect(process.env.mongo_URI).then(data=>
     console.log(`db connected successfully`)
    )
}

export default connectdb