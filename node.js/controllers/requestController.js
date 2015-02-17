
var Request = require('../models/requests');

//**************** Create a Request ******************//
// is a POST - TAKES
// - userid (string)
// - state (Bool)
// - time (Date)
// - name (string)
// - lat  (number)
// - long (number)
exports.createRequest = function(req, res) {
    var request = new Request(); // create a new instance of the Req model
    request.userid = req.body.userid; //
    request.state  = req.body.state; // 
    request.time   = req.body.time; //
    request.lat    = req.body.lat; // 
    request.long   = req.body.long; //
    request.ttl    = 100; //

    request.save(function(err) {
        if (err)
            res.send(err);
            
        setInterval(function() {
            checkForEligableUsers(request);
        }, 4000)
        res.json({
            message: 'Request Sent!'
        });
    });
}

//**************** Get Requests ******************//
// is a Get - TAKES - nothing, so returns all reqs!
exports.getRequest=function(req, res) {
    Request.find(function(err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
}



//**************** Get User ******************//
// is a GET - TAKES the user id /api/users/id
exports.getRequestUser = function(req, res) {
    Request.find({
        'userid': req.params.user_id
    }, function(err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
}