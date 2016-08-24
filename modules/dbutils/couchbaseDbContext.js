var couchbase = require('couchbase');

var cluster;
var n1qlQuery;

function CouchBaseDBContext(clusterURI) {
    cluster = new couchbase.Cluster(clusterURI);
    n1qlQuery = couchbase.N1qlQuery;
}

function bucketOpenCallback(error) {
    if (error) {
        throw error;
    }

    console.log('Bucket opened.');
}

function openBucket(bucketName, bucketPassword) {
    return cluster.openBucket(bucketName, bucketPassword, bucketOpenCallback);
}

function disconnectFromBucket(bucket) {
    bucket.disconnect();
}

function createN1qlQuery(queryString) {
    return n1qlQuery.fromString(queryString);
}

CouchBaseDBContext.prototype.openBucket = openBucket;
CouchBaseDBContext.prototype.disconnectFromBucket = disconnectFromBucket;
CouchBaseDBContext.prototype.createN1qlQuery = createN1qlQuery;

module.exports = CouchBaseDBContext;