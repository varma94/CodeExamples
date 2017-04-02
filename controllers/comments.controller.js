var mongoose = require('mongoose');
var Comment = require('../models/comments.model.js').Comments;

//Posting Comments to a particular Recipe for a partiuclar user in Comments collection
exports.insertComment = function (comment,uid,recipeId,media, response) {
         var comment = new Comment({uid: uid,commentText:comment, commentedOn:recipeId, commentMedia: media});
         comment.save(function(err,result){
         if(err)
          console.log("Could not create the comment due to"+err);
         else
          response.send(result);
         });
}

//Deleting comments for a partiuclar recipe from comments collection
exports.removeComment = function(commentid,response){
          mongoose.model('Comment').remove({"_id":commentid}).lean().exec(function(err,result){
              if(err){
               console.log(err);
               console.log("Document could not be removed");
              }
              else{
                response.send("Successfully removed document");
              }
          });
}


//A GET request to get all comments in the comments collection
exports.getComments = function (uid, res) {

    //Populating schema objects referred in the Comments Schema
    mongoose.model('Comment').find({"uid":uid}).populate({path:'commentedOn',model:'Recipe', populate: [{
                path: 'ingredients',
                model: 'Ingredient'           
            },{
                path: 'utensils',
                model: 'Utensil'           
            }]}).lean().exec(function (err, commentedRecipe) {
        if (err) {
            console.log('Could not retrieve due to '+err);
        }else{
             if(commentedRecipe==="" || commentedRecipe==null){
               commentedRecipe = "No data found";
             }
               res.format({
                      json: function () {
                          res.json(commentedRecipe);
                      }
               });
        }
    });
}














