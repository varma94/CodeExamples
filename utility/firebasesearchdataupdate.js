 var mongoose = require('mongoose');
 require('../models/user.model.js');
 var firebaseController = require('../controllers/firebaseauthentication.controller.js');



exports.userSearchIngredientDataUpdate = function(uid,name){
    console.log("In search and upate")
  

                mongoose.model('User').findOneAndUpdate({uid:uid}, { $push: { 'searchData.ingredientData':name }}, { new: true }, function (err, tank) {
                  if (err) console.log(err);
                });
    
            
};

exports.userSearchUtensilDataUpdate = function(uid,name){

                mongoose.model('User').findOneAndUpdate({uid:uid}, { $push: { 'searchData.utensilData':name }}, { new: true }, function (err, tank) {
                  if (err) console.log(err);
                });
 
            
};

exports.userSearchRecipeDataUpdate = function(uid,name){

                mongoose.model('User').findOneAndUpdate({uid:uid}, { $push: { 'searchData.recipeData':name }}, { new: true }, function (err, tank) {
                  if (err) console.log(err);
                });
 
            
};

