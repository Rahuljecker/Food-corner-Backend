import express from "express";
import { Contactus } from "../Controllers/Other.js";
import { isAuthenticated } from "../Middleware/Auth.js";
const router=express.Router();

router.route("/contact").post(Contactus);

export default router;