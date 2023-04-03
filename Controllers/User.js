import { asyncErrorMiddleWare } from "../Middleware/ErrorHandler.js";
import { Order } from "../Models/Order.js";
import { User } from "../Models/User.js";
import ErrorHandlerUtils from "../Utils/ErrorHandlerUtils.js";



export const getMyprofile=asyncErrorMiddleWare(async(req,res,next)=>{
    const user =req.user;
    if(!user)
    return next(new ErrorHandlerUtils("Not looged in,Kindly log in",401));
    
    res.status(200).json({
        success:true,
        user:req.user,
        message:"Welcome back `${user.user.name}`",
    });
    })




//logout
export const logout=(req,res,next)=>{
req.session.destroy((err)=>{
if(err) return next(err);
res.clearCookie("connect.sid",{
    secure:process.env.NODE_DEV==="development"?false:true,
    httpOnly:process.env.NODE_DEV==="development"?false:true,
    sameSite:process.env.NODE_DEV==="development"?false:"none",
});
res.status(200).json({
    success:true,
    message:"Logout successfully",
})
})
}


//admin section
export const GetAllusersAdmin=asyncErrorMiddleWare(async(req,res,next)=>{
const users=await User.find({});
res.status(200).json({
    message:"Logout successfully",
    users,
})

})
export const GetAdminStats=asyncErrorMiddleWare(async(req,res,next)=>{

const userCount=await User.countDocuments();
const orders=await Order.find({});

const preaparingOrder=orders.filter((i)=>i.orderStatus==="preparing")
const ShippedOrder=orders.filter((i)=>i.orderStatus==="Shipped")
const DeliveredOrder=orders.filter((i)=>i.orderStatus==="Delivered")
let TotalIncome=0;
orders.forEach(i=>{
    TotalIncome+=i.TotalPrice;
})

    res.status(200).json({
        userCount,
        ordersCount:{
            total:orders.length,
            preparing:preaparingOrder.length,
            Shipped:ShippedOrder.length,
            Delivered:DeliveredOrder.length,
        },
        TotalIncome,
})

})
