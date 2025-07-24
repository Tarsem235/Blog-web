const express = require('express')
const dotenv = require('dotenv')
const  DBcon  = require('./utlis/db.js')
const router = require('./routes/auth.js')
const blogrouter = require('./routes/blogRoutes.js')
const dashboardRouter= require('./routes/Dashboard.js')
const commentRouter = require('./routes/Comments.js')
const publicRoute = require('./routes/Public.js')
const cookieparser=require('cookie-parser')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const path = require('path')



dotenv.config()
const PORT = process.env.PORT || 5001
const app = express()
// mongoDb connection

DBcon()


app.use(cors({
  origin: 'http://localhost:5173', // 👈 Frontend URL
  credentials: true
}));
const _dirname = path.resolve();
app.use(cookieParser());
app.use(express.static('public'))
app.use(cookieparser())
app.use(express.json())

app.use('/auth',router)
app.use('/blog',blogrouter)
app.use('/dashboard',dashboardRouter)
app.use('/comment',commentRouter)
app.use('/api' ,publicRoute)
app.use(express.static(path.join(_dirname,'Client/dist')))

// app.get("*" , (_,res)=>{
//   res.sendFile(path.resolve(_dirname,"Client" , "dist" , "index.html"))
// })
app.listen(PORT , ()=>{
  console.log(`app is running on port ${PORT}`)
})