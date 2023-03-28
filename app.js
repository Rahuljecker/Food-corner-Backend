import  express, { urlencoded }  from "express";
import dotenv from "dotenv"
import  {connectPassport}  from "./Utils/Provider.js";
import passport from "passport"; 
import  Session  from "express-session";
import cookieParser from "cookie-parser"
import { ErrorHandler } from "./Middleware/ErrorHandler.js";
import cors from "cors"; 


const app=express();
export default app;
dotenv.config({
    path:"./config/config.env"
})

//using Middlewares
app.use(Session({
    secret:process.env.SESSION_SECRECT,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:process.env.NODE_DEV==="development"?false:true,
        httpOnly:process.env.NODE_DEV==="development"?false:true,
        sameSite:process.env.NODE_DEV==="development"?false:"none",
    }
}))
app.use(express.json());
app.use(urlencoded({
    extended:true,
}))

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET", "POST", "PUT","DELETE"],
}))
app.use(cookieParser());
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

//connect passport 
connectPassport();
//importing routes
import userRoute from "./Routes/User.js"
import orderRoute from "./Routes/Order.js"

app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)

//errorMiddleware
app.use(ErrorHandler)








