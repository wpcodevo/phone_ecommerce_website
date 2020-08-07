const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const AppError = require('./modules/utils/error/appError');
const globalErrorHandler = require('./modules/utils/error/controller/errorController');
const connectDB = require('./config/db');
const productRouter = require('./modules/products/routes');
const userRouter = require('./modules/users/routes');
const categoryRouter = require('./modules/categories/routes');
const reviewRouter = require('./modules/reviews/routes');
const cartRouter = require('./modules/cart/routes');

const app = express();

connectDB();

// Global Middlewares
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again after 1 hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whiteList: ['ratingsAverage', 'price'],
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/carts', cartRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
