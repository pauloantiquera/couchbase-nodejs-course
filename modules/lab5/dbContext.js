var CouchBaseDbContext = require('../dbutils/couchbaseDbContext');
var ottoman = require('ottoman');

var couchbaseClusterURI = 'localhost:8091';
var customer360_odmBucketName = 'customer360_odm';
var customer360_odmBucketPassword = 'password';
var dbContextInstance

function DbContext() {
    couchbaseDbContext = new CouchBaseDbContext(couchbaseClusterURI);
    var bucket = openCustomer360_odmBucket(couchbaseDbContext);
    initializeOttomanInstance(bucket);
}

function openCustomer360_odmBucket(couchbaseDbContext) {
    var bucket = couchbaseDbContext.openBucket(customer360_odmBucketName, customer360_odmBucketPassword);

    return bucket;
}

function initializeOttomanInstance(bucket) {
    ottoman.bucket = bucket;
}

function createModelFor(modelName, model, index) {
    return ottoman.model(modelName, model, index);
}

DbContext.prototype.createModelFor = createModelFor;

function getDbContextInstance() {
    if (!dbContextInstance) {
        dbContextInstance = new DbContext();
    }

    return dbContextInstance;
}


var dbContextInstanceService = {
    getDbContextInstance: getDbContextInstance
}

module.exports = dbContextInstanceService;