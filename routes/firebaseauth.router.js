var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var firebaseController = require('../controllers/firebaseauthentication.controller.js');

// Common
router.use(bodyParser.urlencoded({ extended: true }));

//Posting to a Google Firebase controller to get the corresponding Unique id
router.post('/login', function (req, res) {

    //Sending the request and response parametres to firebaseController to authenticate
    firebaseController.authenticate(req, res, function(dataToken){
        res.format({
                    json: function () {
                       res.json(dataToken);
                    }
        });
    });
});

//A Utility to generate a Firebase Token.
router.get('/firebaseToken', function (req, res) {

    firebaseController.getToken(req, res, function(dataToken){
        res.redirect('/api/index?token='+dataToken);
    });
});



//
module.exports = router;
