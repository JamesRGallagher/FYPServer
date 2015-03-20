//
var Request = require('../models/requests');
var User = require('../models/users');

/** 
 * [createRequest - called when the client sends a POST to /requests]
 * @param  {[Object]} req [An object containing the HTTP request:
 *                        -userid
 *                        -state
 *                        -time
 *                        -lat
 *                        -long
 *                        -message
 *                        ]
 * @param  {[Object]} res [An object containing the HTTP response - this is a POST so should not be used.]
 */
exports.createRequest = function(req, res) {

    //Create a new instance of the request model
    var request = new Request();

    //Fill the model with the parameters in the HTTP request
    request.userid = req.body.userid;
    request.state = req.body.state;
    request.time = req.body.time;
    request.lat = req.body.lat;
    request.long = req.body.long;
    request.message = req.body.message;
    request.ttl = 100; 

    //Check to see if the user exists. They should/will do, 
    //this is just to be safe!
    User.count({
        _id: req.body.userid
    }, function(err, count) {

        //If there is a user with the id (The count is > 0)
        if (count > 0) {

            //Find the user
            User.find({
                _id: req.body.userid
            }, function(err, user) {

                //If the user can't be found (again they should and will), throw an error.
                //Otherwise take a point away from the users points, as the request has cost
                //them one point.
                if (err) {
                    res.status('400').send("No user with that name!");
                    return;
                } else {
                    user.points = user.points - 1;
                }
            });
        } else {

            //The user was not found so throw a 400 error.
            res.status('400').send("User does not exsit");
            return;
        }
    });

    //We have reached this point so we know the request has been generated.
    //Therefore, we have to save the request
    request.save(function(err) {
        if (err) {

            //If the was an error saving the request, throw an internal server error.
            res.status('500').send("Error saving request!");
            return;
        } else {

            //If there was no problem saving the request, we will return a success
            res.json({
                message: 'Request Sent!'
            });

            //We know the request has been saved succesfullt
            //so now we can send a push notfication to eligible users
            var reqLat = request.lat;
            var reqLong = request.long;

            // send push notifications to users
            //in the area.
            var users; //Holds all the users.

        //Calling find with no criteria finds all the users
        User.find(function(err, users) {
            if (err) {
                console.log("Can't any find users")
            } else {
                //If we have found users, initalise an array to hold those that
                //are eligible for this request
                var eligible = [];
                //Then, for each user, call the isBounded function.
                //if is bounded returns true, check the user bounded 
                //is NOT the same one that send the request
                //and add the user to the eligible array.
                for (var i = 0; i < users.length; i++) {
                    if (isBounded(reqLat, reqLong, users[i].lat, users[i].long, 0.1)) {
                        if (req.body.user_id != users[i]._id) {
                            eligible.push(users[i].gcmRegId)
                        }
                    }
                }
            }
            //Initalise the google cloud messaging service
            var gcm = require('node-gcm');

            //Create a message with some values.
            var message = new gcm.Message({
                collapseKey: 'demo',
                delayWhileIdle: true,
                timeToLive: 3,
                data: {
                    message: 'New request in your area!',
                }
            });

            //Set up the sender with the API key.
            var sender = new gcm.Sender('AIzaSyDMJx3zrQAcXZWioYXy_b3bp7-SVnb4E7U');

            //And then call the send method, and handle the errors.
            sender.send(message, eligible, function(err, result) {
                if (err) console.error(err);
                    else console.log(result);
                });
            })
        }
    });
}


/**
 * [isBounded - called by pushNotify, decides if a user is bound by a request]
 * @param  {[Integer]}  rLat     [Latitude of the request]
 * @param  {[Integer]}  rLong    [Longitude of the request]
 * @param  {[Integer]}  uLat     [Latitude of the user]
 * @param  {[Integer]}  uLong    [Longitude of the user]
 * @param  {[Integer]}  radius   [The area the request encompasses]
 * @return {Boolean}        [Returns true if the user is bounded]
 */
function isBounded(rLat, rLong, cx, cy, radius) {
    var distancesquared = (rLat - cx) * (rLat - cx) + (rLong - cy) * (rLong- cy);
    return distancesquared <= radius * radius;
}





/** 
 * [getRequest called when the client sends a GET to /requests with a user id in the body of the request as a query]
 * @param  {[Object]} req [Object containing request]
 * @param  {[Object]} res [Object containing the response - a list of eligible users to show 
 *                         the request too.]
 * @return {[void]}     [void]
 */
exports.getRequest = function(req, res) {
    console.log("HEre");
    //We start by finding the users with the given id.
    User.findById(req.query.user_id, function(err, user) {
        //Handle errors
        if (err) {
            res.status('400').send("User does not exsit");
            return
        } else if (!user) {
            res.status('400').send("User does not exsit");
            return
        } else {

            //Self explanitory
            userLat = user.lat;
            userLong = user.long;
            
            //Holds an array of all the requests
            var requests;
            Request.find(function(err, requests) {
                //Again handle the error case - (no requests).
                if (err) {
                    res.status('400').send("No requests");
                    return
                } else {
                    //Initalise an array of eligibile requests for the user.
                    var eligible = [];
                    //Iterate through the requests. If the user is bounded by them
                    //add them to the eligble array.
                    for (i = 0; i < requests.length; i++) {
                        if (isBounded(userLat, userLong, requests[i].lat, requests[i].long, 0.3)) {
                            if (req.query.user_id != requests[i].userid) {
                                eligible.push(requests[i])
                            }
                        }
                    }
                }
                
                //Return the eligible requests in JSON to the client.
                res.json(eligible);
            }).sort({ //Sort by time.
                time: 1
            }).bind({
                userLat: userLat,
                userLong: userLong
            });
        }
    }).sort({
        time: 1
    });
}




/** 
 * [getRequestUser called when the client sends a GET to /requests with a user id as a url parameter]
 * @param  {[Object]} req [Object containing the userID]
 * @param  {[Object]} res [Object containing the response - a list of the requests the given user has sent.]
 * @return {[void]}     [void]
 */
exports.getRequestUser = function(req, res) {
    
    //A very simple method, just find the requets with this users ID and return them!
    Request.find({
        'userid': req.params.user_id
    }, function(err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
}