var User = require('../models/users');

var outputFilename = 'locations.json'; //A dummy file used to check the location tracking is working.

/**
 * [createUser creates a new user, called when the client sends a POST to /user]
 * @param  {[type]} req [An object containing the HTTP request:
 *                      -name
 *                      -email
 *                      -pass
 *                      -lat
 *                      -long
 *                      ]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.createUser =  function(req, res) {
    // create a new instance of the user model
    var user = new User(); 

    //Fill the model with the parameters in the HTTP request
    user.username = req.body.name; 
    user.email = req.body.email;  
    user.password = req.body.pass; 
    user.lat = req.body.lat;  
    user.long = req.body.long; 
    user.points = 10; // All users start with a score of ten!
    
    //Save the user, and handle errors.
    user.save(function(err) {
        if (err){   
            res.status('500').send("Something went wrong :(");
        } else {
        res.json({
            message: 'user created!'
        });
        }
    });
};


/**
 * [getUsers returns a list of all users. Not used by the client, but can be accessed with a get to /users]
 * @param  {[type]} req [An object containing the HTTP request]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.getUsers =function(req, res) {
    //Find all the users.
    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
}

/**
 * [authUser authenicates the user, called when the client sends a POST to /auth. Sends back the 
 * user object to the client if successfull]
 * @param  {[type]} req [An object containing the HTTP request]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.authUser = function(req, res) {
    //Start by finding the user.
    User.find({username: req.body.user_id }, function(err, user) {
        //Return an error if the user cannot be found.
        if (err){
             res.status('400').send("No user with that name!");
        } else {
            if(user.length !== 0){
                //If the user is found and the pass word is correct, return the user object 
                //to the client
                if(user[0].password == req.body.pass){
                    res.json(user);
                } else {
                    //Retun 401 - not authorized
                    res.status('401').send("Wrong pass!");
                }
            }
            //Return an error if the user cannot be found.
            res.status('400').send("No user with that name!");
        }
    });
}


/**
 * [getUser returns a details of a user. Called when the client sends a get to /users with an id]
 * @param  {[type]} req [An object containing the HTTP request]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}


/**
 * [updateUser returns a details of a user. Called when the client sends a put to /users with a ID]
 * @param  {[type]} req [An object containing the HTTP request]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.updateUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
    
    //For every parameter, check if it is set and if so, update.
    //...but first check for an error!
    if (err)
        res.send(err);

    if (req.body.name)
        user.name = req.body.name; //Update the name

    if (req.body.email)
        user.email = req.body.email; //Update the email

    if (req.body.pass)
        user.pass = req.body.pass; //Update the pass

    if (req.body.lat){
        user.lat = req.body.lat; //Update the email
    }
    
    if (req.body.long){
        user.long = req.body.long; 
    }
       
    if (req.body.gcmRegId){
        user.gcmRegId = req.body.gcmRegId;        
    }

    //Once the changes have been made, save the user.
    user.save(function(err) {
        if (err)
            res.send(err);
            res.json({
                message: 'user updated!'
             });
        });
    });
}



/**
 * [updateUser This is a workaround for android since phonegap plugin only allows POST.]
 * @param  {[type]} req [An object containing the HTTP request]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.updateUserLocation = function(req, res) {
    //See example above, basically.
    User.findById(req.params.user_id, function(err, user) {
    if (req.body.location.latitude){
        user.lat = req.body.location.latitude; 
    }
    if (req.body.location.longitude){
        user.long = req.body.location.longitude; 
    }
    user.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'user updated!'
             });
             
        });
    });
}


/**
 * [deleteUser deletes a user on DELETE at /users with ID]
 * @param  {[type]} req [An object containing the HTTP request]
 * @param  {[type]} res [An object containing the HTTP response]
 * @return {[void]}     [void]
 */
exports.deleteUser = function(req, res) {

    //Pretty self explanitory..
    User.remove({
         _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });
}