//
var Response = require('../models/responses');
var Request = require('../models/requests');
var User = require('../models/users');
/** 
 * [createResponse - called when the client sends a POST to /response]
 * @param  {[Object]} req [An object containing the HTTP request:
 *                        -userid
 *                        -reqid
 *                        -recipId
 *                        -time
 *                        -image (base64 encoded string)
 *                        -message
 *                        ]
 * @param  {[Object]} res [An object containing the HTTP response - this is a POST so should not be used.]
 */
exports.createResponse = function(req, res) {

    //Create a new instance of the response model
    var response = new Response();

    //Fill the model with the parameters in the HTTP request
    response.userid = req.body.userid; 
    response.reqid = req.body.reqid; 
    response.recipId = req.body.recipId 
    response.time = req.body.time; 
    response.image = req.body.image;
    response.message = req.body.message;

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
                //Otherwise add a point to  the users points, as the response has gained
                //them one point :)
                if (err) {
                    res.status('400').send("No user with that name!");
                } else {
                    user.points = user.points + 1;
                }
            });
        } else {
            //The user was not found so throw a 400 error.
            res.status('400').send("User does not exsit");
            return;
        }
    });

    //We have reached this point so we know the response has been generated.
    //Therefore, we have to save the response
    response.save(function(err) {
        if (err) {

            //If the was an error saving the response, throw an internal server error.
            res.status('500').send("Error");
            return;

        } else {

            //If there was no problem saving the response
            //find the request it is for and add the response
            //to the requests list of responses.
            Request.findByIdAndUpdate(response.reqid, {$push: { "responses": response} }, {
                safe: true,
                upsert: true
            },
            function(err, model) {
                //Then find the user who send the request that this 
                //response is for and send them a push notification
                User.findById(req.body.recipId, function(err, user) {
                    //Handle the error!
                    if (err) {
                        res.status('400').send("Error");
                        return
                    }

                    //Initalise the google cloud messaging service
                    var gcm = require('node-gcm');
                    //Create a new message
                     var message = new gcm.Message({
                        collapseKey: 'demo',
                        delayWhileIdle: true,
                        timeToLive: 0,
                        data: {
                            message: 'You have received a response!',
                        }
                    });

                    // Set up the sender with the API key
                    var sender = new gcm.Sender('AIzaSyDMJx3zrQAcXZWioYXy_b3bp7-SVnb4E7U');
                        
                    //Should only be one eligible user in the array.
                    var eligible = [user.gcmRegId];

                    //So send this user the push notifcation, handling the errors.
                    sender.send(message, eligible, function(err, result) {
                        if (err) {
                            res.status('400').send("Error");
                            return
                        } else {
                            console.log(result);
                        }
                    });
                });
                if (!err) {
                    res.json({
                        message: 'request sent!'
                    });
                } else {
                    res.status('400').send("Error");
                    return;
                }
                res.status('400').send("Error");
            });
        }
    });
}

/** 
 * [getResponse called when the client sends a GET to /responses with a user id as a url parameter]
 * @param  {[Object]} req [Object containing the userID]
 * @param  {[Object]} res [Object containing the response - a list of the responses the given user has.]
 * @return {[void]}     [void]
 */
exports.getResponse = function(req, res) {
    //A very simple method, just find the responses with this users ID and return them!
    Request.find({
        '_id': req.params.req_id
    }, function(err, response) {
        res.status('400').send("Error");
    });


}