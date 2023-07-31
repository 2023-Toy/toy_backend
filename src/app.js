var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login.routes');
var usersRouter = require('./routes/users');
<<<<<<< HEAD
var communityRouter = require('./routes/community.routes');
=======
var dealRouter = require('./routes/deal.routes');
var imgRouter = require('./module/multer');
>>>>>>> d3607d4fae8aca8a1d548438143262d59e842081

var app = express();

//

const mysql = require('mysql2')

const client = mysql.createConnection({
  user: 'root',
  password: '1q2w3e4r', //본인의 db root 계정 비밀번호
  database: 'toy', //본인의 db
  host: '210.119.104.148',
  port: 3306
})

client.connect()

//


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if(process.env.ENODE_ENV=='production'){
  app.use(logger('combined'))
}else{
  app.use(logger('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/board', communityRouter);
=======
app.use('/', dealRouter);
>>>>>>> d3607d4fae8aca8a1d548438143262d59e842081

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