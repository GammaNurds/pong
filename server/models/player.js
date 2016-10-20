'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: { type: String, required: true },
},{
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);
