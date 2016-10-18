'use strict';

var mongoose = require('mongoose');

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
