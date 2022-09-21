var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const limitRequest = require("express-rate-limit");
const compressor = require("compression");
var indexRouter = require('./routes/index');





var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//limiting concurrent request's 
//to prevent DOS and DOSS attacks
//maximum 10 request in 30 seconds
app.use(limitRequest({
  windowMs:1000 * 30,
  max:10,
  message:"too many requests. try after sometime"
}));


//using compressor package to 
//decrease payload size
app.use(compressor());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  console.log(err.message);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


   

module.exports = app;




