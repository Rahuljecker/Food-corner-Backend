import { asyncErrorMiddleWare } from "../Middleware/ErrorHandler.js";
import { Order } from "../Models/Order.js";
import ErrorHandlerUtils from "../Utils/ErrorHandlerUtils.js";
import {instance} from "../server.js"
import crypto from "crypto"
import {Payment} from "../Models/Payment.js"



export const CreateOrder =asyncErrorMiddleWare(async (req, res, next) => {
    const { shippingInfo, orderItem, paymentMethod, ItemsPrice, TaxPrice,ShippingPrice, TotalPrice } = req.body;
    const user = req.user._id;
    const orderOptions = {
        shippingInfo, orderItem, paymentMethod, ItemsPrice, TaxPrice,ShippingPrice, TotalPrice, user
    }

    await Order.create(orderOptions);

    res.status(201).json({
        success: true,
        message: "your order has been placed Successfully via COD(Cash On Delivery)",
    })
})


export const CreateOrderOnline =asyncErrorMiddleWare(async (req, res, next) => {
    const { shippingInfo, orderItem, paymentMethod, ItemsPrice, TaxPrice, ShippingPrice, TotalPrice } = req.body;
    const user = req.user;
    const orderOptions = {
        shippingInfo, orderItem, paymentMethod, ItemsPrice, TaxPrice,ShippingPrice, TotalPrice, user
    }
    const options = {
        amount: Number(TotalPrice)*100,  // amount in the smallest currency unit
        currency: "INR",
      };
    const order= await instance.orders.create(options);


    res.status(201).json({
        success: true,
        order,
        orderOptions,
    })
})


//payment verification
export const paymentVerification= asyncErrorMiddleWare(async (req, res, next) =>{
const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;

const body=razorpay_order_id+"|"+razorpay_payment_id;

const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY).update(body).digest("Hex");
const isAuthentic=expectedSignature===razorpay_signature;

if(isAuthentic){
const payment=await Payment.create({razorpay_order_id,razorpay_payment_id,razorpay_signature})

await Order.create({
    ...orderOptions,
    paidAt:new Date(Date.now()),
    paymentInfo:payment._id,
})
res.status(201).json({
    success: true,
    message:`Your order is placed SuccessFully.Paymnet Id:${payment._id}`,
})
}else{
    return next(new ErrorHandlerUtils("Payment Failed",400))
}


})


export const GetAllOrders =asyncErrorMiddleWare(async (req, res, next) => {
const orders=await Order.find({
user:req.user._id,
}).populate("user","name");
    res.status(200).json({
        success: true,
        message: "your orders are here!",
        orders,
    })
})

//admin
export const GetAllOrdersAdmin =asyncErrorMiddleWare(async (req, res, next) => {
const orders=await Order.find({}).populate("user","name");
    res.status(200).json({
        success: true,
        message: "Customers all orders are here!",
        orders,
    })
})





export const GetOrderDetails =asyncErrorMiddleWare(async (req, res, next) => {

const order=await Order.findById(req.params.id).populate("user","name");

if(!order) return next(new ErrorHandlerUtils("Invalid Order Id",404))



    res.status(200).json({
        success: true,
        message: "your orders are here!",
        order,
    })
})


export const processOrderAdmin =asyncErrorMiddleWare(async (req, res, next) => {

    const order=await Order.findById(req.params.id);

    if(!order) return next(new ErrorHandlerUtils("Invalid Order Id",404))

    if(order.orderStatus==="preparing") order.orderStatus="Shipped"
    else if(order.orderStatus==="Shipped") {
        order.orderStatus="Delivered";
        order.DeliveredAt=Date.now();
    }
    else if(order.orderStatus="Delivered") return next(new ErrorHandlerUtils("Food already Delivered",400));

    await order.save();

    res.status(200).json({
        success: true,
        message: "Status Updated Successfully!",
    
    })
})