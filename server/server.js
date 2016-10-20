'use strict';

var path = require("path");

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3002;;  //
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes.js');

// middleware
app.use(logger('dev'));  // morgan
app.use(cors());
app.use(bodyParser.json());

// database
var db = process.env.MONGOLAB_URI ||
"mongodb://admin:admin@ds029655.mlab.com:29655/heroku_gtwrnqdn";
mongoose.connect(db, function(err) {
    if (err) {
        console.log("couldn't connect to mongodb!");
        console.log(err);
    } else {
        console.log("connected to mongodb successfully!");
    }
});

// serve ng app
app.use(express.static(path.resolve(__dirname, '../dist'))); // serve ng app

// serve api routes
app.use('/api', routes);

app.listen(port, function () {
    console.log('Server listening on port ' + port + "!");
});
