var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');
var Schema = mongoose.Schema;


//Creating schema and ensuring they are indexed in the ELASTICSEARCJ
var csCookStep = new mongoose.Schema({

  stepID:          {type:Number,es_indexed:true},
  state:           {type:String,es_indexed:true},
  stepType:        {type:String,es_indexed:true},
  cookTill:        {type:String,es_indexed:true},
  ingredientId:    {type:String,es_indexed:true},
  tool:            {type:Array,es_indexed:true},
  stepDescription: {type:String,es_indexed:true},
  platformID:      {type:String,es_indexed:true},
  media:           {type:String,es_indexed:true},
  notes:           {type:String,es_indexed:true},
  tips:            {type:Array,es_indexed:true}
});

//Creating schema and ensuring they are indexed in the ELASTICSEARCH
var recipeSchema = new mongoose.Schema({
  name:              {type:String,es_indexed:true},
  authorFullName:    {type:String,es_indexed:true},
  authorScreenName:  {type:String,es_indexed:true},
  recipeId:          {type:String,es_indexed:true},
  recipeTags:        {type:Array,es_indexed:true},
  type:              {type:Array,es_indexed:true},
  cookingTime:       {type:String,es_indexed:true},
  uploadDate:        {type:String,es_indexed:true},
  views:             {type:String,es_indexed:true},
  reviews:           {type:Array,es_indexed:true},
  recipeDescription: {type:String,es_indexed:true},
  genre:             {type:Array,es_indexed:true},
  serving:           {type:String,es_indexed:true},
  level:             {type:String,es_indexed:true},
  coverImage:        {type:String,es_indexed:true},
  likes:             {type:Number,es_indexed:true},
  numberComments:    {type:Number,es_indexed:true},
  comments:          {type:Array,es_indexed:true},
  views:             {type:Number,es_indexed:true},
  utensils:          [{type: Schema.Types.ObjectId,ref: Utensils}],
  uploadLocation:    {type:String,es_indexed:true},
  ingredients:       [{type: Schema.Types.ObjectId,ref: Ingredients}],
  cookingSteps:      [csCookStep] //Referecing another schema in the current schema
})


//Creating an indexing in the elasticsearch for recipes
recipeSchema.plugin(mongoosastic,{
  index : "cookit",
  type : "ingredientsUtensils",
  esClient: esClient
});

var esClient = require('../utility/connection.js');
var Ingredients = require('./ingredient.model.js').Ingredients;
var Utensils = require('./utensil.model.js').Utensils;

//Using the models from the Recipe models.
Recipe = mongoose.model('Recipe', recipeSchema);
stream = mongoose.model('Recipe', recipeSchema).synchronize();
count = 0; 

//Exporting or exposing the schema to use them in other places.
module.exports.requestSchema = recipeSchema; 

//Indexing existing document into elasticsearch
stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed recipe' + count + ' documents!');
}); 
stream.on('error', function(err){
  console.log(err);
});
module.exports.Recipe = Recipe;