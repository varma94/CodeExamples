var elasticsearch=require('elasticsearch');


//Creating a connection to the ELASTICSEARCH instance
var client = new elasticsearch.Client( {  
  hosts: 'localhost:9200'
});

module.exports = client;