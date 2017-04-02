var findOrCreate = require('mongoose-findorcreate')
var user = require('../models/user.model');

var mongoose = require('mongoose');

//Creating a new user finding a new user depending on the unique id from the GOOGLE FIREBASE.
exports.findOrCreate = function(req){

mongoose.model('User').findOrCreate({uid: req.params.uid}, {username: req.params.uname}, function(err, click, created) {
  // created will be true here
  console.log(created);
  
});

}