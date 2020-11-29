const AppError = require('./../utils/appError.js')
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)
    const message = `Duplicate field value: ${value[0]} Please use another value`;
    return new AppError(message, 400)
}

const handleValidationDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid Input Data: ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const handleJWTError = err => new AppError('Invalid Token: Please Login again', 401);

const handleJWTExpiredError = err => new AppError('Token Expired: Please Login again', 401);


const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
};
const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        }); 
    }
//Prog. or some other error
    else{
        console.error('error', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        });
    }
   
};

module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status= err.status || 'error';
   
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);
        sendErrorProd(error, res);
        
    }
    
}