var couchbase = require("couchbase");
var express = require("express");
var bodyParser = require('body-parser');
var uuid = require("node-uuid");

var cluster = new couchbase.Cluster("localhost:8091");
var app = express();
var jsonParser = bodyParser.json();

var port = process.env.port || 3000;
var bucketName = "customer360";
var password = "password";

var customer360Bucket = cluster.openBucket(bucketName, password, function(error) {
  if (error) {
    throw error;
  }

  console.log(bucketName, 'bucket opened');
});

// Set up get, post, put, and delete routes
// Set jsonParser as middleware for POST and PUT routes, so that req.body can be accessed for JSON
// Declare and assign doc and docId vars in each route, as relevant, with request data
// Open bucket in each route

app.use(jsonParser);

app.get("/customers/:id", function(request, response){
  var docId = request.params.id;

  customer360Bucket.get(docId, function(error, rows) {
    if (error) {
      return response.status(404).json({'error' : 'No item found for ' + docId});
    }

    response.json(rows.value);
  })

});

app.post("/customers", jsonParser, function(request, response) {

  function performInsertOperation(bucket, docId, doc, callback) {
    bucket.insert(docId, doc, callback);
  } 

  function performUpsertOperation(bucket, docId, doc, callback) {
    bucket.upsert(docId, doc, callback);
  }

  function operationCallback(error, result) {
    if (error) {
      return response.status(400).json(error);
    }

    response.json(result);
  }

  var docIdSuffix = 'an-example-key';
  var docId = 'customer::' + docIdSuffix;
  var doc = request.body;

  //performInsertOperation(customer360Bucket, docId, doc, operationCallback);
  performUpsertOperation(customer360Bucket, docId, doc, operationCallback);
});

app.put("/customers/:id", jsonParser, function(request, response){
  return response.status(400).json({'error' : 'Not implemented yet'});
});

app.delete("/customers/:id", function(request, response){
  return response.status(400).json({'error' : 'Not implemented yet'});
});

app.listen(port, function(err){
    console.log("customer360 running on port:", port);;
});
