
'use strict';

var express = require('express'),
    path = require('path');

var favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler');
    
var HomeController = require('./back-end/controllers/home-controller');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './back-end/views')); // critical to use path.join on windows
app.set('view engine', 'vash');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'blarg blarg'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
    app.use(errorHandler());
}

// initialize controllers
new HomeController(app);

app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${app.get('port')}`);
});