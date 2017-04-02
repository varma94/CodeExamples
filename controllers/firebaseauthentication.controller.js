
var express = require('express'),
  mongoose = require('mongoose'); 
var firebase = require('firebase');
var admin = require("firebase-admin");


var findOrCreate = require('../utility/findorcreate.utility.js');
var serviceAccount = require("../cookitapp-99518-firebase-adminsdk-31oez-fa1fb93922.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

//Defining the configuration file to connect with the Google Firebase api
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
};
firebase.initializeApp(config);

//Authentication function
exports.authenticate = function(req,response,callback){

var uid;

//Getting the token from the Request Header
var idToken = req.get('token');

try
{
    //Authenticating the provided token with Google Firebase
    admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {

        uid = decodedToken.uid;
        user = decodedToken.email;

        req.params.uid = uid;
        req.params.uname =user;

        //Creating the User in the database if one does not exi
        findOrCreate.findOrCreate(req);
        
        var responseJson = {"username":user,"uid":uid};
        callback(responseJson);
        
      }).catch(function(error) {
        console.log("invalidToken");
        callback("invalidToken");
       
    });
}catch(err){
   console.log("Invalid Token: Please resend or recreate the token");
  callback("invalidToken");
 
}

}


exports.getToken = function(req,response,callback){

 var email = req.query.user;
 var password = req.query.password;

try
{

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    user.getToken().then(function(data) {
     console.log(data);
      callback(data);
      });
  });

}catch(err){
  console.log(err);
   console.log("Invalid Token: Please resend or recreate the token");
}

}











