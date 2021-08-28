var createError = require('http-errors');
var express = require('express');
var session = require("express-session");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var membersRouter = require('./routes/members');

var app = express();
// fix post calls
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true})).use(bodyParser.json())
// app.use(session({ secret: "my-secret" }));
app.use(cors());
// connect to mongoDB
require('./configs/database');


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const { use } = require("./routes/index");

app.use('/', indexRouter);
app.use('/index', indexRouter);
// app.use('/login',loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies',moviesRouter);
app.use('/api/members',membersRouter);
app.use('/api/login',loginRouter);
// app.use('/api/movies',moviesRouter);
// app.use('/api/members',membersRouter);
// app.use('/api/subscriptions',subscriptionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
