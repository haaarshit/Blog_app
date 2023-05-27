import express from "express"
import cors from 'cors'
import router from "./routes/routes.js"
import cookieparser from "cookie-parser"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.json())

app.use(cookieparser())
// cors

const corsOptions = {
    origin: 'http://localhost:5173', //frontend url
    credentials: true,
    methods:'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    // allowedHeaders:"*"
  };


app.use(cors(corsOptions));

// routing
app.use(router)

export default app


// db connection str
// mongodb+srv://harshblogapp:F35edmyblogapp@cluster0.glogork.mongodb.net/?retryWrites=true&w=majority