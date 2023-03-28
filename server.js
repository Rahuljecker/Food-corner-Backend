import app from "./app.js"
import { connectDb } from "./config/database.js"
import Razorpay from "razorpay"


//database connection
connectDb();
//razorpay
export const instance = new Razorpay({ key_id: process.env.RAZORPY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET_KEY })



app.get("/",(req,res,next)=>{
res.send("<h1>Working bhai</h1>")
})

app.listen(process.env.PORT,()=>{
console.log(`Server is working on PORT: ${process.env.PORT} in ${process.env.NODE_DEV}`)
})

