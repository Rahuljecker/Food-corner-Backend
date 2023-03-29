import express from "express";
import { CreateOrder, CreateOrderOnline, GetAllOrders, GetOrderDetails, paymentVerification, processOrderAdmin } from "../Controllers/Order.js";
import { AuthorizeByAdmin, isauthenticated } from "../Middleware/Auth.js";

const router=express.Router();

router.post("/createorder",isauthenticated, CreateOrder)
router.get("/myorders",isauthenticated, GetAllOrders)
router.get("/order/:id",isauthenticated, GetOrderDetails)

//online order placed

router.post("/createorderonline",isauthenticated, CreateOrderOnline)
router.post("/paymentVerification",isauthenticated, paymentVerification)

//Admin Section
router.get("/admin/orders",isauthenticated,AuthorizeByAdmin, GetAllOrders)
router.get("/admin/order/:id",isauthenticated, AuthorizeByAdmin,processOrderAdmin)

export default router; 