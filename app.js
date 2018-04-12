const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const queryBooleanParser = require('express-query-boolean');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const corsConfig = require('./configs/cors.config');

require('./configs/db.config');
require('./configs/passport.config').setup(passport);

const housesRouter = require('./routes/houses.routes');
const usersRouter = require('./routes/users.routes');
const sessionRouter = require('./routes/session.routes');

const app = express();

app.use(cors(corsConfig))

app.use(logger('dev')); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(queryBooleanParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user || {};
  next();
});

app.use('/houses', housesRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter);



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
