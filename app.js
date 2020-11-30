
const express = require('express');
const helmet = require('helmet')
const monogSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');



const app = express();



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
// app.use((req, res, next) => {
//     app.use(function(req, res, next) {
//         res.header('Access-Control-Allow-Credentials', true);
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//         res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//         next();
//       });
//     });

// MIDDLEWARES 
// Security HTTP headers
app.use(helmet());


// Development Logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body Parser, reading data from body to req.body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());


// Data Sanitization against NoSQL query injection
app.use(monogSanitize());

// Data Sanitization against XSS
app.use(xssClean());

// Prevent Parameter Pollution
app.use(hpp());

// rate limiter
const limiter = rateLimit({
    max: 1000,
    windowMs: 60*60*1000, 
    message: 'Too many requests from this IP, try again next hour'
})
app.use('/', limiter);

app.use('/social/posts', postRouter);
app.use('/social/users', userRouter);

app.use(globalErrorHandler);


module.exports = app;

