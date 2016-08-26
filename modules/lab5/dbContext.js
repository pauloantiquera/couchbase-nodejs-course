var CouchBaseDbContext = require('../dbutils/couchbaseDbContext');

var couchbaseClusterURI = 'localhost:8091';
var customer360_odmBucketName = 'customer360_odm';
var customer360_odmBucketPassword = 'password';
var couchbaseDbContext;

function DBContext() {
    couchbaseDbContext = new CouchBaseDbContext(couchbaseClusterURI);
}

function openCustomer360_odmBucket() {
    return couchbaseDbContext.openBucket(customer360_odmBucketName, customer360_odmBucketPassword);
}

DBContext.prototype.openCustomer360_odmBucket = openCustomer360_odmBucket;

module.exports = DBContext;