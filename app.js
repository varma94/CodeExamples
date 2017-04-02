var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var winston = require('winston');
 
//Importing the routes to be used for routing when a particular URL hits the server
var routes = require('./routes/index.router');
var search = require('./routes/search.router');
var recipes = require('./routes/recipes.router');
var ingredients = require('./routes/ingredients.router');
var utensils = require('./routes/utensils.router');
var imgSearch = require('./routes/imagesearch.router');
var firebaseauthentication = require('./routes/firebaseauth.router.js');
var recipefeed = require('./routes/recipefeed.router.js');
var bookmark = require('./routes/bookmark.router.js');
var comments = require('./routes/comments.router.js');
var pubsub = require('./controllers/pubsub.controller.js');

/* Models Schema declared */
var db = require('./models/db');

// Main app object 
app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());


//Router used inside application
app.use('/', routes);
app.use('/api/search', search);
app.use('/api/recipes', recipes);
app.use('/api/ingredients', ingredients);
app.use('/api/utensils', utensils);
app.use('/api/search2',imgSearch);
app.use('/api/firebase',firebaseauthentication);
app.use('/api/contextual',contextsearch);
app.use('/api/ingredientutensilmodel',ingredientUtensilModel);
app.use('/api/recipefeed',recipefeed);
app.use('/api/bookmarks',bookmark);
app.use('/api/comments',comments);

/*Utility files which will not be needed in production*/
//Return an HTML file when /api/index hits the server
app.get('/api/index', function(request, res){
   res.sendFile('cookit.html',{ root: path.join(__dirname, './utility') });
});
app.get('/api/token', function(request, res){
   res.sendFile('firebaseclient.html',{ root: path.join(__dirname, './utility') });
});

app.get('/login', function(request, res){
   res.sendFile('loginmain.html',{ root: path.join(__dirname, './utility') });
});

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

//handle 404 responses
app.use(function (req, res, next) {
    res.status(404).send('Sorry can\'t find that!');
});

//setting application on port 8081
app.listen(8081, function () {
    console.log('Application listening on port 8081');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

  //Logging using WINSTON LOGS.
  //Needs to be implemented.
  winston.add(winston.transports.File, { filename: 'somefile.log' });
  winston.remove(winston.transports.Console);
  winston.log('info', 'Hello distributed log files!');
  winston.info('Hello again distributed logs');
 
  winston.level = 'debug';
  winston.log('debug', 'Now my debug messages are written to console!');

module.exports = app;