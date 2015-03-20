{"filter":false,"title":"requestController.js","tooltip":"/node.js/controllers/requestController.js","undoManager":{"mark":60,"position":60,"stack":[[{"group":"doc","deltas":[{"start":{"row":3,"column":0},"end":{"row":9,"column":39},"action":"remove","lines":["/**"," * [pushNotify sends push notfications to eligible users]"," * @param  {[Integer]} lat  [Latitude of the request]"," * @param  {[Integer]} long [Longitude of the request]"," * @return {[void]}         [void]"," */"," var pushNotify = function(lat, long) {"]}]}],[{"group":"doc","deltas":[{"start":{"row":49,"column":0},"end":{"row":49,"column":1},"action":"remove","lines":["}"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":0},"end":{"row":48,"column":6},"action":"remove","lines":["    var users; //Holds all the users.","","    //Calling find with no criteria finds all the users","    User.find(function(err, users) {","        if (err) {","            console.log(\"Can't any find users\")","        } else {","            //If we have found users, initalise an array to hold those that","            //are eligible for this request","            var eligible = [];","            //Then, for each user, call the isBounded function.","            //if is bounded returns true, check the user bounded ","            //is NOT the same one that send the request","            //and add the user to the eligible array.","            for (var i = 0; i < users.length; i++) {","                if (isBounded(reqLat, reqLong, users[i].lat, users[i].long, 0.1)) {","                    if (req.body.user_id != users[i]._id) {","                        eligible.push(users[i].gcmRegId)","                    }","                }","            }","        }","        //Initalise the google cloud messaging service","        var gcm = require('node-gcm');","","        //Create a message with some values.","        var message = new gcm.Message({","            collapseKey: 'demo',","            delayWhileIdle: true,","            timeToLive: 3,","            data: {","                message: 'New request in your area!',","            }","        });","","        //Set up the sender with the API key.","        var sender = new gcm.Sender('AIzaSyDMJx3zrQAcXZWioYXy_b3bp7-SVnb4E7U');","","        //And then call the send method, and handle the errors.","        sender.send(message, eligible, function(err, result) {","            if (err) console.error(err);","            else console.log(result);","        });","    })"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":0},"end":{"row":5,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":0},"end":{"row":4,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":38},"end":{"row":2,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":81,"column":14},"end":{"row":81,"column":18},"action":"remove","lines":["Call"]}]}],[{"group":"doc","deltas":[{"start":{"row":81,"column":38},"end":{"row":81,"column":39},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":81,"column":15},"end":{"row":81,"column":33},"action":"remove","lines":["push notify, which"]}]}],[{"group":"doc","deltas":[{"start":{"row":81,"column":14},"end":{"row":81,"column":15},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":83,"column":12},"end":{"row":83,"column":40},"action":"remove","lines":["pushNotfiy(reqLat, reqLong);"]},{"start":{"row":83,"column":12},"end":{"row":126,"column":6},"action":"insert","lines":["    var users; //Holds all the users.","","    //Calling find with no criteria finds all the users","    User.find(function(err, users) {","        if (err) {","            console.log(\"Can't any find users\")","        } else {","            //If we have found users, initalise an array to hold those that","            //are eligible for this request","            var eligible = [];","            //Then, for each user, call the isBounded function.","            //if is bounded returns true, check the user bounded ","            //is NOT the same one that send the request","            //and add the user to the eligible array.","            for (var i = 0; i < users.length; i++) {","                if (isBounded(reqLat, reqLong, users[i].lat, users[i].long, 0.1)) {","                    if (req.body.user_id != users[i]._id) {","                        eligible.push(users[i].gcmRegId)","                    }","                }","            }","        }","        //Initalise the google cloud messaging service","        var gcm = require('node-gcm');","","        //Create a message with some values.","        var message = new gcm.Message({","            collapseKey: 'demo',","            delayWhileIdle: true,","            timeToLive: 3,","            data: {","                message: 'New request in your area!',","            }","        });","","        //Set up the sender with the API key.","        var sender = new gcm.Sender('AIzaSyDMJx3zrQAcXZWioYXy_b3bp7-SVnb4E7U');","","        //And then call the send method, and handle the errors.","        sender.send(message, eligible, function(err, result) {","            if (err) console.error(err);","            else console.log(result);","        });","    })"]}]}],[{"group":"doc","deltas":[{"start":{"row":126,"column":4},"end":{"row":126,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":126,"column":8},"end":{"row":126,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":125,"column":8},"end":{"row":125,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":125,"column":12},"end":{"row":125,"column":16},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":12},"end":{"row":124,"column":16},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":16},"end":{"row":124,"column":20},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":123,"column":12},"end":{"row":123,"column":16},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":122,"column":8},"end":{"row":122,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":122,"column":12},"end":{"row":122,"column":16},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":122,"column":12},"end":{"row":122,"column":16},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":121,"column":8},"end":{"row":121,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":119,"column":8},"end":{"row":119,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":118,"column":8},"end":{"row":118,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":116,"column":8},"end":{"row":116,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":115,"column":8},"end":{"row":115,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":8},"end":{"row":114,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":113,"column":8},"end":{"row":113,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":112,"column":8},"end":{"row":112,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":111,"column":8},"end":{"row":111,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":110,"column":8},"end":{"row":110,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":109,"column":8},"end":{"row":109,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":108,"column":8},"end":{"row":108,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":106,"column":8},"end":{"row":106,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":105,"column":8},"end":{"row":105,"column":12},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":104,"column":4},"end":{"row":104,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":103,"column":4},"end":{"row":103,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":102,"column":4},"end":{"row":102,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":101,"column":4},"end":{"row":101,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":100,"column":4},"end":{"row":100,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":99,"column":4},"end":{"row":99,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":98,"column":4},"end":{"row":98,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":97,"column":4},"end":{"row":97,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":96,"column":4},"end":{"row":96,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":95,"column":4},"end":{"row":95,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":94,"column":4},"end":{"row":94,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":93,"column":4},"end":{"row":93,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":92,"column":4},"end":{"row":92,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":91,"column":4},"end":{"row":91,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":90,"column":4},"end":{"row":90,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":89,"column":4},"end":{"row":89,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":88,"column":4},"end":{"row":88,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":87,"column":4},"end":{"row":87,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":86,"column":4},"end":{"row":86,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":85,"column":4},"end":{"row":85,"column":8},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":83,"column":12},"end":{"row":83,"column":16},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":0,"column":1},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":1},"end":{"row":0,"column":2},"action":"insert","lines":["/"]}]}]]},"ace":{"folds":[],"customSyntax":"javascript","scrolltop":0,"scrollleft":0,"selection":{"start":{"row":0,"column":2},"end":{"row":0,"column":2},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1426848135295,"hash":"12d3c714b11b4a534e6a8c6f2d3f54316bcede5e"}