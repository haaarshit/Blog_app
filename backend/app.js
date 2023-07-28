import express from "express"
import cors from 'cors'
import router from "./routes/routes.js"
import cookieparser from "cookie-parser"
import bodyParser from "body-parser"
import path from "path"

const app = express()
app.use(bodyParser.json({limit: '1mb'}));
app.use(express.json())

app.use(cookieparser())


// cors
const corsOptions = {
    origin: 'http://localhost:5173', //frontend url
    credentials: true,
    methods:'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  };


app.use(cors(corsOptions));

// routing
app.use(router)

// app.use(express.static(path.resolve("./frontend/dist")))
// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve("./frontend/dist/index.html"))
// })

if (process.env.App_status === "production") {

  app.use(express.static(path.resolve(__dirname,'frontend','dist')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

export default app
