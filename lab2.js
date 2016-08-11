var couchbase = require('couchbase');
var couchbaseCluster = new couchbase.Cluster('127.0.0.1:8091');

var customer360Bucket = couchbaseCluster.openBucket('customer360', 'password', function(error) {
  if (error) {
    throw error;
  }
});

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
