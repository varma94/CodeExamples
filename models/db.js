var mongoose = require('mongoose');

//Database connection to mongoose
mongoose.connect('mongodb://127.0.0.1/cookit');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Mongoose connected.');
});
