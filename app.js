var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compress = require('compression');
var minify = require('express-minify');

var passport = require('passport');
var hash = require('password-hash-and-salt');
var flash = require('connect-flash');
var helmet = require('helmet');
var session = require('express-session');

var FileStore = require('session-file-store')(session);
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users-api');
var registrants = require('./routes/registrants-api');
var tasks = require('./routes/tasks-api');
var lists = require('./routes/lists-api');
var version = require('./routes/version-api');
var sync = require('./routes/sync-api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compress());

if (app.get('env') === 'development') {
  app.use(logger('dev'));
} else {
  app.use(minify());
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(flash());
app.use(session({
    secret: 'listodo is so simple',
    name: 'listodo-session',
    proxy: false,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({ path: './tmp/sessions', logFn: function () {} })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api/users', users);
app.use('/api/registrants', registrants);
app.use('/api/tasks', tasks);
app.use('/api/lists', lists);
app.use('/api/version', version);
app.use('/api/sync', sync);

// authentication
passport.serializeUser(function(model, done) {
      done(null, model.id);
});

passport.deserializeUser(function(id, done) {
      app.models.users.findOne({ id: id } , function (err, model) {
          delete model.password;
          done(err, model);
      });
});

// define local strategy
passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
},
function(email, password, done) {
        // search in database
        app.models.users.findOne({ email: email }, function (err, model) {
          if (err) { return done(err); }
          if (!model) {
            return done(null, false, { message: 'Incorrect email.' });
          }

          // test password
          hash(password).verifyAgainst(model.password, function(err, verified) {
              if(err || !verified) {
                return done(null, false, {
                    message: 'Invalid password.'
                });
              } else {
                var returnmodel = {
                    email: model.email,
                    id: model.id
                  };
                  return done(null, returnmodel, {
                    message: 'Logged in successfully.'
                  });
              }
          });

        });
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
