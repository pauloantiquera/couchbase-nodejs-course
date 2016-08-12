function getDBContext() {
  var couchbase = require('couchbase');  

  var cluster = new couchbase.Cluster("localhost:8091");
  var n1qlQuery = couchbase.N1qlQuery;
  var customer360BucketName = 'customer360';
  var customer360BucketPassword = 'password';  

  function openBucket() {
    return cluster.openBucket(customer360BucketName, customer360BucketPassword, function(error) {
      if (error) {
        throw error;
      }

      console.log('Lab 4: Bucket ' + customer360BucketName + ' opened.');
    });
  }

  function disconnectFromBucket(bucket) {
    bucket.disconnect();
  }

  function createN1qlQuery(queryString) {
    return n1qlQuery.fromString(queryString);
  }

  var dbContext = {
    open: openBucket,
    disconnect: disconnectFromBucket,
    createQuery: createN1qlQuery
  };

  return dbContext;
}

module.exports = getDBContext;
