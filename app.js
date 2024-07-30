var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// đăng ký Schema
require('./controllers/users/UserModel');
require('./controllers/categories/CategoryModel');
const cors = require('cors');

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const searchHistoriesRouter = require('./routes/searchhistories');
const questionRouter = require('./routes/questions');
const cartRouter = require('./routes/carts');
const notificationRouter = require('./routes/notifications');
const transactionRouter = require('./routes/transactions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect("mongodb://localhost:27017/Assignment")
  .then(() => console.log('Connect successfully!!!'))
  .catch((err) => console.log('Connect failure!!!', err));

app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3000'] }));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/searchhistories', searchHistoriesRouter);
app.use('/questions', questionRouter);
app.use('/carts', cartRouter);
app.use('/notifications', notificationRouter);
app.use('/transactions', transactionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
