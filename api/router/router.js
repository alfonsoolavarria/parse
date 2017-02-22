var Parse = require('parse/node');
var middle = require('../../middleware/headers');
var express = require('express')
var test = require('../controllers/test');
var Users = require('../models/user');

module.exports = function(app) {

  app.get('/alfonso', function(req, res) {
    var test = Parse.Object.extend("GameScore");
		var game = new Parse.Query('GameScore');
    var promises = [],data2=[];
    game.find().then(function(result){
      promises.push(result);
      res.json(promises);
    });


	});

  //signUp user
  app.post('/user',middle.checkParams, function(req, res) {
    Users.createUser({ email: req.body.email, pwd: req.body.password })
      .then(function (user) {
        res.status(user.code).send(user);
    });

  });

 //Login User
  app.post('/login', function(req, res) {
    if (req.body && req.body.email && req.body.password) {
      Users.logIn({ email: req.body.email, pwd: req.body.password })
      .then(function (user) {
        return res.status(user.code).send(user);
      });
    }else {
      return res.status(409).send({error:'Email or Password are required'});
    }
	});

};
