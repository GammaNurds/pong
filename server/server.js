'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3002;  //
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes.js');

// middleware
app.use(logger('dev'));  // morgan
//app.use(express.static(__dirname + '/dist'));  // production//
app.use(cors());
app.use(bodyParser.json());


require('./database.js');

app.use('/api', routes);

app.listen(port, function () {
    console.log('Server listening on port ' + port + "!");
});
