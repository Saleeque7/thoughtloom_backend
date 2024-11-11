export const errrorHandler = async(err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    console.error(err);
    return res.status(statusCode).json({status:'error',message: err.message || "An unexpected error occurred",})
}
