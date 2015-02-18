
var Request = require('../models/requests');
var User = require('../models/users');

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
    request.message= req.body.message; //
    request.ttl    = 100; //

    console.log(request.userid)
    request.save(function(err) {
        if (err){
            res.send(err);
        
            console.log(err)
        } else {
        res.json({
            message: 'Request Sent!'
        });
        console.log('all ok!')
        }
        
    });
}

function isBounded(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}



//**************** Get Requests ******************//
// is a Get - TAKES - nothing, so returns all reqs!
exports.getRequest=function(req, res) {
    User.findById(req.query.user_id, function(err, user) {
        if (err){
            res.send(err);
        } else if(!user){
             res.json({
            message: 'User is null!'
             })
        
        
        }else{
            console.log("Found him")
            console.log(user)
            
            userLat = user.lat;
            userLong = user.long;
            var requests
            Request.find(function(err, requests) {
                if (err){
                    res.send(err);
                } else {
                   
             var eligible = [];
             for(i=0; i<requests.length; i++){
            
                console.log("User Lat",userLat)
                 if(isBounded(userLat, userLong, requests[i].lat, requests[i].long, 0.3)){
                  eligible.push(requests[i]) 
                } 
                }
                }
              res.json(eligible);
            }).bind( {userLat: userLat, userLong:userLong} );
    }
})
}
  
    
    
    //Request.find(function(err, requests) {
      //  if (err)
        //    res.send(err);
        //res.json(requests);
    //});
//}



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