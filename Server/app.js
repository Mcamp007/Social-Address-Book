'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var authMiddleware = require('./util/authMiddleware');

var app = express();
app.set('view engine', 'jade');
app.set('views', "Client");

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/userApp');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json({limit: '100Mb'}));
app.use(express.static('Client'));

// ROUTES
app.use('/API/auth', require('./routes/loginAndRegister'));
app.use('/API/users', authMiddleware, require('./routes/Users'));
app.use('*', require('./routes/index'))

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
