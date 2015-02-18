var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RequestSchema   = new Schema({
    userid: String,
    lat:Number,
    long:Number,
    time:Date,
    state:Number,
    message:String,
    ttl:Number
});

module.exports = mongoose.model('Request', RequestSchema);