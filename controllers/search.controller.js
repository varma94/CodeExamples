var mongoose = require('mongoose');

var upd =    require('../utility/firebasesearchdataupdate.js');
var client = require('../utility/connection.js');
             require('../models/user.model.js');


//Module which uses elastic search to fetch results and log them to the User Collection
exports.findByName = function (req, response, user, uid) {

     client.search({  
       index: "cookit",
       type: "ingredientsUtensils",
       search_type : "dfs_query_then_fetch", //Query option to search in all indexes
       size: 40,
       body: {
         "query": {
          "match" : {
            "name":req.params.name,
           },       
          }
       }  
     },function (error,data) {

          if (error){
            console.log("search error: "+error)
          }
          else {

              if(uid==="invalidtoken")
                data = "Please verify the token. The token may be expired or invalid";
              else {
                  //Error handler to handle error when there is no data
                  try{
                     
                     var searchRes = data.hits.hits;
                     if((searchRes.length>0) && (searchRes[0]._source.elementtype.toString().trim()=='utensils' || searchRes[0]._source.elementtype.toString().trim()=='utensil' ) )
                        upd.userSearchUtensilDataUpdate(uid,req.params.name);
                     else if(searchRes.length>0 && (searchRes[0]._source.elementtype.toString().trim()=='ingredients' || searchRes[0]._source.elementtype.toString().trim()=='ingredient' ))
                        upd.userSearchIngredientDataUpdate(uid,req.params.name); 
                     else
                        upd.userSearchRecipeDataUpdate(uid,req.params.name); 

                  }catch(err){
                      console.log(err);
                      console.log("No data");
                   }
                  
              }
              response.format({json: function(){
                  response.json(data);
              }});
          }
      });
 
}









