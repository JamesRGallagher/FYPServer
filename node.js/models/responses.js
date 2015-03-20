//d
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ResponseSchema   = new Schema({
    userid: {type: String, required: true},
    reqid: {type: String, required: true},
    recipId:{type: String, required: true},
    image:{type: String, required: true},
    message:String,
    time:Date
});

module.exports = mongoose.model('Response', ResponseSchema);