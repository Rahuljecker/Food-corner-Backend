export const ErrorHandler=(err,req,res,next)=>{
err.message=err.message||"Internal Server Error";
err.statusCode=err.statusCode||500

res.status(err.statusCode).json({
    success:false,
    message:err.message,
})
}


export const asyncErrorMiddleWare=(passedFunc)=>(req,res,next)=>{
Promise.resolve(passedFunc(req,res,next)).catch(next)
}