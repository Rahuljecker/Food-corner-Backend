import ErrorHandlerUtils from "../Utils/ErrorHandlerUtils.js";


export const isauthenticated =(req,res,next)=>{
const token=req.cookies["connect.sid"];
if(!token){
    return next(new ErrorHandlerUtils("you are not logged in!",401));
}
next();
}


export const AuthorizeByAdmin =(req,res,next)=>{

if( req.user.role!=="admin"){
    return next(new ErrorHandlerUtils("only Admin can access this!",405));
}
next();
}