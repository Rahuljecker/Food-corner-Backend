import express from "express";
import passport from "passport";
import { GetAdminStats, GetAllusersAdmin, getMyprofile, logout } from "../Controllers/User.js";
import { AuthorizeByAdmin, isAuthenticated } from "../Middleware/Auth.js";

const router=express.Router();

router.get("/googlelogin",passport.authenticate("google",{
    scope:["profile"],
}))


router.get("/login",
passport.authenticate("google",{
    // scope:["profile"],
    successRedirect:process.env.FRONTEND_URL,
})
)
 

//for profile
router.get("/profile",isAuthenticated ,getMyprofile)

//logout
router.get("/logout",logout)

//admin
router.get("/admin/users",isAuthenticated,AuthorizeByAdmin,GetAllusersAdmin)
router.get("/admin/stats",isAuthenticated,AuthorizeByAdmin,GetAdminStats)



export default router;



