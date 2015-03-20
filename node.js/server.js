// connect to our database.
var mongoose = require('mongoose');
mongoose.connect('mongodb://james:password1@ds031741.mongolab.com:31741/testfyp');

//To generate documentation.
var docs = require("express-mongoose-docs");

//We require express and related files.
var express = require('express'); 
var bodyParser = require('body-parser');
var session  = require('express-session');
var cookieParser = require('cookie-parser');

//Import the models.
var User = require('./models/users');
var Request = require('./models/requests');

//Initalise the express app as app, and enables CORS
var app = express(); // define our app using express
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '90mb'
}));
app.use(bodyParser.json({limit: '90mb'}));

//Set the port. If the enviorment is set use that, else 8080.
var port = process.env.PORT || 8080; // set our port

//Set the router
var router = express.Router(); 

//Ensure we go to the next routes and don't stop here
router.use(function(req, res, next) {
    next(); 
});

//Test route - found at /api. Useful for a quick health check.
router.get('/', function(req, res) {
    res.json({
        message: 'Api is running fine'
    });
});


//Intialise the response controller and define routes.
var responseController = require('./controllers/responseController');
//On a post to /response call createResponse in the response controller.
router.route('/response')
    .post(responseController.createResponse)
//On a get to /response call with a users id call getResponse in the response controller.
router.route('/responses/:user_id')
    .get(responseController.getResponse)


//The following routes should be self explanitory given the explination above.

var userController = require('./controllers/userController');

router.route('/register')
    .post(userController.createUser)

router.route('/users')
    .post(userController.createUser)
    .get(userController.getUsers);
    
router.route('/auth')
    .post(userController.authUser)

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .post(userController.updateUserLocation)
    .delete(userController.deleteUser);
    
var requestController = require('./controllers/requestController');

router.route('/requests')
    .post(requestController.createRequest)
    .get(requestController.getRequest);

router.route('/requests/:user_id')
    .get(requestController.getRequestUser);

// Prefix all routes with /api.
app.use('/api', router);

//Start the server, and log out.
app.listen(port);
console.log('The api is running on ' + port + ' :)');
//Generate documentation.
docs(app, mongoose); 