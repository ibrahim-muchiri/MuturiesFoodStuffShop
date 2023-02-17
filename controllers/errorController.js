const AppError = require("../utils/appError");

const handleCastError = err => {
    const message = `Invalid ${err.path} : ${err.value}`;
    // console.log(message);
    return new AppError(message, 400);
}
const handleDuplicateErrorDB = err => {
    // const re = /(["'])(\\?.)*?\1/;
    const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
    console.log(value);
    const message = `Duplicate field value: X . Please use another value`
}
const sendErrorDev =  ((err, res) =>{
res.status(err.statusCode).json({
    status :'fail',
    message: err.message,
    error: err,
    stack: err.stack
}) 
});
const sendErrorProd = (err, res) =>{
    //Operational, trusted error: Send message to the client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message: err.message
        });
        //Programming or other unknown error: Don't leak error details
    }
    else{
        //Log error to the console
        console.log('Error 🔥', err);
        //Send generic error
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!"
        })
    }
    
}

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (process.env.NODE_ENV === 'development'){
       sendErrorDev(err, res);
    }    
    else if(process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if(error.name === 'CastError') error = handleCastError(error);
        if(error.code === 11000) error = handleDuplicateErrorDB(error);
        sendErrorProd(error, res);
    }    
}