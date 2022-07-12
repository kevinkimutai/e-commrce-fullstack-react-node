const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const app = express();

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Hr
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

//Security for Rate Limiting
app.use('/api', apiLimiter);

//Security for HTTP Headers
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());

//Sanitize Input data
app.use(mongoSanitize());

//Cross-browser attacks security
app.use(xss());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

//Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
