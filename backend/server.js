import app from "./app.js"
import dotenv from 'dotenv'
import connectdb from "./database/database.js"


dotenv.config({path:'./backend/config/config.env'})

const PORT = process.env.PORT

connectdb()


app.listen(PORT,()=>{
    console.log("Serve is running successfully")
})