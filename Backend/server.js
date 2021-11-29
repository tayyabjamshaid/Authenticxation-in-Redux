import express from "express"
const app=express();
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port =process.env.PORT||3001;
import UserRouter from "./routers/userRouter.js"
import List from "./routers/listRouter.js"
mongoose.connect("mongodb://localhost:27017/assign",{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true}).then(()=>{console.log("Connected")}).catch(err=>console.log(err))
app.use(cors())
app.use("/user",UserRouter)
app.use("/list",List)
app.listen(port,()=>console.log("Server Running"))