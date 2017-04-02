var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var searchController = require('../controllers/search.controller.js');
var firebaseController = require('../controllers/firebaseauthentication.controller.js');

// Common
router.use(bodyParser.urlencoded({ extended: true }));

//A Router to hadle search queries.
router.get(['/', '/:name'], function (req, res) {
    
    firebaseController.authenticate(req,res,function(dataToken){
        if(dataToken=="invalidtoken"){
            res.contentType('application/json');
            var data = JSON.stringify('/login')
            res.header('Content-Length', data.length);
            res.end(data);
        }
        else{
            searchController.findByName(req,res,dataToken.user,dataToken.uid);
        }
    });
});

module.exports = router;
