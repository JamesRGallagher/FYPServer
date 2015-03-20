//
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Response = require('../models/responses');
var RequestSchema   = new Schema({
    userid: 
    lat:{type: Number, required: true},
    long:{type: Number, required: true},
    time:Date,
    state:Number,
    message:{type: String, required: true},
    range:Number,
    ttl:Number,
    responses: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Request', RequestSchema);