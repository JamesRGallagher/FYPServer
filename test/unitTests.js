var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var winston = require('winston');

describe('Users', function() {
  var url = 'https://fypserver-jamesgallagher.c9.io';
 
  before(function(done) {
    // In our tests we use the test db
    mongoose.connect('mongodb://james:password1@ds031741.mongolab.com:31741/testfyp');
    done();
  });

  //Tesing the registraion of a user with an existing parameter
  describe('Test ID Users1: Registering an existing user', function() {
    it('should return error trying to save duplicate username', function(done) {

    request(url)
	.post('/api/users')
	.send({name: 'james',
        pass: 'james',
        email:'test@test'})
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  
  //Tesing the registraion of a user with a missing paramerter
  describe('Test ID Users2: Registering a new user missing a required parameter', function() {
    it('should return a error!', function(done) {
    request(url)
	.post('/api/users')
	.send({
        pass: 'test',
        email:'test@test'
      })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  
  
//Tesing the registraion of a user with a well formed request
 describe('Test ID Users3: Registering a new user', function() {
    it('should return a success!', function(done) {

    request(url)
	.post('/api/users')
	.send({
        name: 'NewUser12',
        pass: 'test',
        email:'test12@test'
      })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(200);
            done();
        });
    });
  });

 
 //Tesing the registraion of a user with a well formed request
 describe('Test ID Users4: Attempting to log in with a wrong user name', function() {
    it('should return an error!', function(done) {

    request(url)
	.post('/api/auth')
	.send({
        user_id: 'madeup',
        pass: 'james',
       
      })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });

  //Tesing the registraion of a user with a well formed request
 describe('Test ID Users5: Attempting to log in with a wrong password', function() {
    it('should return an error!', function(done) {

    request(url)
	.post('/api/auth')
	.send({
        user_id: 'james',
        pass: 'wrongpass',
       
      })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });

   //Tesing the registraion of a user with a well formed request
 describe('Test ID Users6: Attempting to log in with correct credentials', function() {
    it('should return an success!', function(done) {

    request(url)
	.post('/api/auth')
	.send({
        user_id: 'james',
        pass: 'james',
       
      })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(200);
            done();
        });
    });
  });
    describe('Test ID Req1: Sending a request with no message', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/requests')
	.send({
   userid:"54e7f32ff86afc444700000c",
   state:1,
   time: new Date(),
   lat:'-2',
   long:'52',
   ttl :100
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  
describe('Test ID Req2: Sending a request with no latitude', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/requests')
	.send({
   userid:"54e7f32ff86afc444700000c",
   state:1,
   time: new Date(),
   
   long:'52',
    message:'test',

   ttl :100
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  
  describe('Test ID Req3: Sending a request with no longitude', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/requests')
	.send({
   userid:"54e7f32ff86afc444700000c",
   state:1,
   time: new Date(),
   
   lat:'-2',
    message:'test',

   ttl :100
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  
    describe('Test ID Req4: Sending a request with no user id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/requests')
	.send({
     state:1,
    time: new Date(),
    long:'52',
   lat:'-2',
    message:'test',

   ttl :100
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  
  
        describe('Test ID Req5: Sending a request with incorrect user id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/requests')
	.send({
      userid:"This is nonsense",

     state:1,
    time: new Date(),
    long:'52',
   lat:'-2',
    message:'test',

   ttl :100
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
     describe('Test ID Req6: Sending a well formed request', function() {
    it('should return success.', function(done) {
    request(url)
	.post('/api/requests')
	.send({
	       userid:"54e7f32ff86afc444700000c",
      state:1,
    time: new Date(),
    long:'52',
   lat:'-2',
    message:'test',

   ttl :100
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(200);
            done();
        });
    });
  });

 
 

 
     describe('Test ID Resp1: Sending a response with no user id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
      reqid:"54f34e3583a3424b06000018",
    recipId:"54e7f3f8f86afc4447000010",
    image:'test',
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
       describe('Test ID Resp2: Sending a response with no req id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"54e7f32ff86afc444700000c",
    recipId: "54e7f3f8f86afc4447000010",
    image:'test',
   time:new Date()
 
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
     describe('Test ID Resp3: Sending a response with no recipient id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"54e7f32ff86afc444700000c",
      reqid:"54f34e3583a3424b06000018",
    image:'test',
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
       describe('Test ID Resp4: Sending a response with no image', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"54e7f32ff86afc444700000c",
      reqid:'54f34e3583a3424b06000018',
    recipId:"54e7f3f8f86afc4447000010" ,
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
    describe('Test ID Resp5: Sending a response with an incorrect recip id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"54e7f32ff86afc444700000c",
      reqid:'54f34e3583a3424b06000018',
    recipId:"nonsense" ,
    image:'test',
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  describe('Test ID Resp6: Sending a response with an incorrect req id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"54e7f32ff86afc444700000c",
      reqid:'nonsense',
    recipId:"54e7f3f8f86afc4447000010" ,
    image:'test',
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
  describe('Test ID Resp7: Sending  a response with an incorrect user id', function() {
    it('should return error.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"nonsense",
      reqid:'54f34e3583a3424b06000018',
    recipId:"54e7f3f8f86afc4447000010" ,
    image:'test',
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(400);
            done();
        });
    });
  });
    describe('Test ID Resp8: Sending a response with a well formed  request', function() {
    it('should return success.', function(done) {
    request(url)
	.post('/api/response')
	.send({
	  userid:"54e7f32ff86afc444700000c",
      reqid:'54f34e3583a3424b06000018',
    recipId:"54e7f3f8f86afc4447000010" ,
    image:'test',
   time:new Date()
 
  })
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
            res.status.should.be.equal(200);
            done();
        });
    });
  });
 });