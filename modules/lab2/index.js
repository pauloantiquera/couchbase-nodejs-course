function getLab2Module() {
  var couchbase = require('couchbase');
  var express = require('express');

  var couchbaseCluster = new couchbase.Cluster('127.0.0.1:8091');
  var appRouter = express.Router();

  function getCountryUSDocument(request, response, next) {
    var customer360Bucket = couchbaseCluster.openBucket('customer360', 'password', function(error) {
      if (error) {
        throw error;
      }
    });

    var docId = 'country::US';

    customer360Bucket.get(docId, function(error, rows) {
      if (error) {
        throw error;
      }

      customer360Bucket.disconnect();

      console.log('JSON document \n', rows);
      console.log('JSON object \n', rows.value);

      var country = rows.value;

      console.log('Name:', country.name);
      console.log('Population:', country.population);

      response.json(country);
    });
  }

  appRouter.get('/', getCountryUSDocument);

  return appRouter;
}

module.exports = getLab2Module;
