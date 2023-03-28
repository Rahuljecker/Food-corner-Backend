import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"
import { User } from "../Models/User.js";

export const connectPassport=()=>{
    passport.use(new GoogleStrategy({
        clientID:process.env.Google_Client_Id,
        clientSecret:process.env.Google_Secret_Id,
        callbackURL:process.env.Google_CALLBACK_URL,
    },async function(accessToken,refreshToken,profile,next){
        //Dtabase comes here
        const user=await User.findOne({
            googleId:profile.id,
           
        });

        if(!user){
            const newUser=await User.create({
                googleId:profile.id,
                name:profile.displayName,
                photo:profile.photos[0].value,
            }) 
            return next(null,newUser);

        }
        else{
            return next(null,user);

        }





    }));
passport.serializeUser((user,next)=>{
next(null,user.id);
})

passport.deserializeUser(async(id,next)=>{
    const user=await User.findById(id);
    next(null,user);
})
}