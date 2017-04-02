var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema ({
	uid :         {type:String, es_indexed:true},
	commentText : {type:String, es_indexed:true},
	commentMedia :{type:Array, es_indexed:true},
	time :        {type:Date, default: Date.now, es_indexed:true },
	commentedOn : {type: Schema.Types.ObjectId,ref: Recipes}
});

var Recipes = require('./recipe.model.js').Recipe;
var Comment = mongoose.model('Comment',commentsSchema);

module.exports.Comments = Comment;
