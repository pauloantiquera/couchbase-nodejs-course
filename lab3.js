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

function openBucket(bucketName, password, callback) {
  var bucket = cluster.openBucket(bucketName, password, callback);

  return bucket;
}

function openBucketCallback(error) {
  if (error) {  
    throw error;
  }

  console.log(bucketName, 'bucket opened');
}

app.use(jsonParser);

app.get("/customers/:id", function(request, response){
  var customer360Bucket = openBucket(bucketName, password, openBucketCallback);

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

  var customer360Bucket = openBucket(bucketName, password, openBucketCallback);

  var docIdSuffix = 'an-example-key';
  var docId = 'customer::' + docIdSuffix;
  var doc = request.body;

  //performInsertOperation(customer360Bucket, docId, doc, operationCallback);
  performUpsertOperation(customer360Bucket, docId, doc, operationCallback);
});

app.put("/customers/:id", jsonParser, function(request, response){
  var customer360Bucket = openBucket(bucketName, password, openBucketCallback);

  var docId = request.params.id;
  var doc = request.body;

  customer360Bucket.replace(docId, doc, function(error, result) {
    if (error) {
      return response.status(400).json(error);
    }

    return response.json(result);
  });
});

app.delete("/customers/:id", function(request, response){
  var customer360Bucket = openBucket(bucketName, password, openBucketCallback);

  var docId = request.params.id;

  customer360Bucket.remove(docId, function(error, result) {
    if (error) {
      return response.status(400).json(error);
    }

    return response.json(result);
  });  
});

app.listen(port, function(err){
    console.log("customer360 running on port:", port);;
});
