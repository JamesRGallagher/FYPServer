var User = require('../models/users');
var fs = require('fs');



var outputFilename = 'locations.json';

//**************** Create a User ******************//
// is a POST - TAKES
// - name (string)
// - email (string)
// - pass (string)
// - name (string)
// - lat  (number)
// - long (number)
exports.createUser =  function(req, res) {
    var user = new User(); // create a new instance of the User model
    user.username = req.body.name; //
    user.email = req.body.email; // 
    user.password = req.body.pass; //
    user.lat = req.body.lat; // 
    user.long = req.body.long; // 

    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({
            message: 'user created!'
        });
    });
};
//**************** Get Users ******************//
// is a Get - TAKES - nothing, so returns all users!
exports.getUsers =function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
}
//**************** Get User ******************//
// is a GET - TAKES the user id /api/users/id
exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}
//**************** Update User ******************//
// is a PUT - TAKES whatever you want to change
exports.updateUser = function(req, res) {
    console.log(req)
    User.findById(req.params.user_id, function(err, user) {

    if (err)
        res.send(err);

    if (req.body.name)
        user.name = req.body.name; // update the name

    if (req.body.email)
        user.email = req.body.email; // update the email

    if (req.body.pass)
        user.pass = req.body.pass; // update the pass

    if (req.body.lat){
        user.lat = req.body.lat; // update the email
        console.log(req.body.lat)
        
    }

    if (req.body.long){
        user.long = req.body.long; // update the pass
         console.log(req.body.long)
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

//**************** Workaround for android  ******************//
// is a PUT - TAKES whatever you want to change
exports.updateUserAndroid = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
    if (req.body.location.latitude){
        user.lat = req.body.location.latitude; // update the email
        console.log(req.body.location.latitude)
        
    }
       if (req.body.location.longitude){
        user.long = req.body.location.longitude; // update the email
        console.log(req.body.location.longitude)
        
    }
    
    var myData = {
            'lat':req.body.location.latitude,
            'long':req.body.location.longitude
}
fs.appendFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
    user.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'user updated!'
             });
             
        });

    });
    
}
//**************** Delete User ******************//
// is a DELETE -  TAKES the user id /api/users/id
exports.deleteUser = function(req, res) {
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