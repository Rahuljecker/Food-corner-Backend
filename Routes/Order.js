import express from "express";
import { CreateOrder, CreateOrderOnline, GetAllOrders, GetOrderDetails, paymentVerification, processOrderAdmin } from "../Controllers/Order.js";
import { AuthorizeByAdmin, isAuthenticated } from "../Middleware/Auth.js";

const router=express.Router();

router.post("/createorder",isAuthenticated, CreateOrder)
router.get("/myorders",isAuthenticated, GetAllOrders)
router.get("/order/:id",isAuthenticated, GetOrderDetails)

//online order placed

router.post("/createorderonline",isAuthenticated, CreateOrderOnline)
router.post("/paymentVerification",isAuthenticated, paymentVerification)

//Admin Section
router.get("/admin/orders",isAuthenticated,AuthorizeByAdmin, GetAllOrders)
router.get("/admin/order/:id",isAuthenticated, AuthorizeByAdmin,processOrderAdmin)

export default router; 