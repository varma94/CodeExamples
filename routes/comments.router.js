var express = require('express'),
    router = express.Router(), //mongo connection
    bodyParser = require('body-parser'); //used to manipulate POST

var commentsController = require('../controllers/comments.controller.js');
var firebaseController = require('../controllers/firebaseauthentication.controller.js');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res) {

    firebaseController.authenticate(req,res,function(dataToken){
        if(dataToken=="invalidToken")
            res.send("Token is invalid or expired. Please recreate the token");
        else
            commentsController.getComments(dataToken.uid,res);
    });
});

router.post('/add', function (req, res) {

    firebaseController.authenticate(req,res,function(dataToken){
         if(dataToken=="invalidToken")
            res.send("Token is invalid or expired. Please recreate the token");
        else{
            commentsController.insertComment(req.body.comment===""?"":req.body.comment,
                                             dataToken.uid, 
                                             req.body.recipeId===""?"":req.body.recipeId,
                                             req.body.media===""?"":req.body.media,res);
        }
    });
});

router.get('/remove/:commentid',function(req,res){
    
     firebaseController.authenticate(req,res,function(dataToken){
         if(dataToken=="invalidToken")
           res.send("Token is invalid or expired. Please recreate the token");
         else
           commentsController.removeComment(req.params.commentid,res);
     });

});


module.exports = router;
