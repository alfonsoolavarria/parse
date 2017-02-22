var Parse = require('parse/node');

var UsersModel = {};

UsersModel.logIn = function logIn (options) {
  return Parse.User.logIn(options.email, options.pwd)
    .then(function (user) {
      var userdata = user.toJSON();
      return {code:200,data:userdata};
    });
};

UsersModel.createUser = function createUser (options) {
  var query = new Parse.Query('User');
  return query.equalTo('username',options.email).find().then(function(userEx){
    if (userEx.length<=0) {
      var user = new Parse.User();
      user.set('username', options.email);
      user.set('password', options.pwd);
      user.set('email', options.email);
      user.set('isActive', true);
      user.signUp();
      user.save(null, { useMasterKey: true });
      return {code:200,data:user};
    }
    else {
      return {code:409,error:'User Exist'};
    }
  })



};

module.exports = UsersModel;
