var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var ivr = require('./routes/ivr');
var users = require('./routes/users');
/*
var accountSid = 'ACe4c44d43d09dc9d4ef3ca8c7247c437f';
var authToken = "eb8afc6693084bcabddd0499e69ecf70";
var client = require('twilio')(accountSid, authToken);

client.calls.list(function(err, data){
    console.log("Caller Number: " + data.calls[0].from);
    console.log("Duration: " + data.calls[0].duration);
});

*/
/*
var accountSid = 'ACe4c44d43d09dc9d4ef3ca8c7247c437f';
var authToken = "eb8afc6693084bcabddd0499e69ecf70";
var client = require('twilio')(accountSid, authToken);

/*client.incomingPhoneNumbers.list({
    url: "https://cf431423.ngrok.io/users",
    from: "+15125809418"
  }, function(err, data) {
    data.incomingPhoneNumbers.forEach(function(number) {
      console.log(number.phoneNumber);
    });
  }
);*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/ivr', ivr);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;