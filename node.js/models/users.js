var mongoose     = require('mongoose'),
ObjectId = mongoose.Schema.Types.ObjectId,
PassportLocalStrategy = require('passport-local').Strategy;
var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
    username: String,
    email: {type:String, required: true, trim: true, lowercase:true, unique: true},
    password: String,
    email: String,
    lat:Number,
    long:Number
});


module.exports = mongoose.model('User', UserSchema);