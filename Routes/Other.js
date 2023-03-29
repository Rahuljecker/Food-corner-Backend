import express from "express";
import { Contactus } from "../Controllers/Other.js";
const router=express.Router();

router.route("/contact").post(Contactus);

export default router;