import mongoose from "mongoose";

const schema=new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        require:true,
    },razorpay_order_id:{
        type:String,
        require:true,
    },razorpay_signature:{
        type:String,
        require:true,
    },
    createdAt:{
        type:String,
        default:Date.now,
    }
})

export const Payment=mongoose.model("payment",schema)

