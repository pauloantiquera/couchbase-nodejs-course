(function() {
  var couchbase = require('couchbase');
  var couchbaseCluster = new couchbase.Cluster('127.0.0.1:8091');

  var customer360Bucket = couchbaseCluster.openBucket('customer360', 'password', function(error) {
    if (error) {
      throw error;
    }
  });

  // Get known document by document-id, assign rowsing value to local var, and log name and population values
  customer360Bucket.get("country::US", function(error, rows) {
    if (error) {
      throw error;
    }

    console.log('JSON document \n', rows);
    console.log('JSON object \n', rows.value);

    var country = rows.value;

    console.log('Name:', country.name);
    console.log('Population:', country.population);

    customer360Bucket.disconnect();
  });


        // Configure admin password on bucket, use password to open bucket


})();