//
var mongoose     = require('mongoose'),
ObjectId = mongoose.Schema.Types.ObjectId,
PassportLocalStrategy = require('passport-local').Strategy;
var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
    username:  {type:String, required: true, trim: true, lowercase:true, unique: true},
    email: {type:String, required: true, trim: true, lowercase:true, unique: true},
    password: String,
    lat:Number,
    long:Number,
    gcmRegId:String,
    points:Number
});

module.exports = mongoose.model('User', UserSchema);