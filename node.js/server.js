// server.js
var passport = require('passport');
//var authController = require('./controllers/auth');
// connect to our database
var mongoose = require('mongoose');
mongoose.connect('mongodb://james:password1@ds031741.mongolab.com:31741/testfyp');

//Import our models
var User = require('./models/users');
var Request = require('./models/requests');
var express = require('express'); // call express
var bodyParser = require('body-parser');
var passport = require('passport');
var session  = require('express-session');
var cookieParser = require('cookie-parser');

var app = express(); // define our app using express
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// bodyParser will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function checkForEligableUsers(req){

   // console.log("checkForEligableUsers" + lat

}

//Set the port
var port = process.env.PORT || 8080; // set our port

//Get expresses router - this allows us to be restful
var router = express.Router(); 


//Every request will call this - it's useful for debugging/logging
router.use(function(req, res, next) {
    console.log('We have been called!');
    next(); // make sure we go to the next routes and don't stop here
});

// test route - found at /api)
router.get('/', function(req, res) {
    res.json({
        message: 'Api is running fine'
    });
});

var userController = require('./controllers/userController');
//The following happens at /api/users!
router.route('/users')
    .post(userController.createUser)
    .get(userController.getUsers);
    
    
//The following happens at /api/users/userid
router.route('/users/:user_id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .post(userController.updateUserAndroid)
    .delete(userController.deleteUser);

var requestController = require('./controllers/requestController');
//The following happens at /api/requests!
router.route('/requests')
    .post(requestController.createRequest)
    .get(requestController.getRequest);

router.route('/requests/:user_id')
.get(requestController.getRequestUser);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('The api is running on ' + port + ' :)');