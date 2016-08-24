function getDBContext() {
    var CouchBaseDbContext = require('../dbutils/couchbaseDbContext');

    var customer360BucketName = 'customer360';
    var customer360BucketPassword = 'password';

    var couchbaseDbContext = new CouchBaseDbContext('localhost:8091');

    function openBucket() {
        return couchbaseDbContext.openBucket(customer360BucketName, customer360BucketPassword);
    }

    function disconnectFromBucket(bucket) {
        couchbaseDbContext.disconnectFromBucket(bucket);
    }

    function createN1qlQuery(queryString) {
        return couchbaseDbContext.createN1qlQuery(queryString);
    }

    var dbContext = {
        open: openBucket,
        disconnect: disconnectFromBucket,
        createQuery: createN1qlQuery
    };

    return dbContext;
}

module.exports = getDBContext;