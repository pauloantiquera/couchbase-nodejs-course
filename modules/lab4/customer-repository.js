function getCustomerRepository() {
  var couchbaseContext = require('./db-context')();
  var uuid = require("node-uuid");

  function findCustomerByCountryCode(code, callback) {
    var customer360Bucket = couchbaseContext.open();

    var query = couchbaseContext.createQuery('SELECT firstName, lastName, billingAddress FROM customer360 WHERE type = \'customer\' AND billingAddress.country = $1');

    customer360Bucket.query(query, [code], function(error, rows) {      
      couchbaseContext.disconnect(customer360Bucket);
      
      if (error) {
        return callback(error);
      }

      callback(null, rows);
    });
  }

  function generateCustomerDocId() {
    return 'customer::' + uuid.v4();
  }

  function createNewCustomer(doc, callback) {
    var customer360Bucket = couchbaseContext.open();

    var query = couchbaseContext.createQuery('INSERT INTO customer360 (KEY, VALUE) VALUES ($1, $2)');

    var docId = generateCustomerDocId();

    customer360Bucket.query(query, [docId, doc], function(error) {
      couchbaseContext.disconnect(customer360Bucket);
      
      if(error) {
        return callback(error);
      }

      callback(null, docId);
    });
  }

  function updateCustomerFirstAndLastName(docId, firstName, lastName, callback) {
    var customer360Bucket = couchbaseContext.open();

    var query = couchbaseContext.createQuery('UPDATE customer360 USE KEYS($1) SET firstName = $2, lastName = $3');

    customer360Bucket.query(query, [docId, firstName, lastName], function(error) {
      couchbaseContext.disconnect(customer360Bucket);
      
      if(error) {
        return callback(error);
      }

      callback();
    });
  }

  function deleteCustomer(docId, callback) {
    var customer360Bucket = couchbaseContext.open();

    var query = couchbaseContext.createQuery('DELETE FROM customer360 USE KEYS($1)');

    customer360Bucket.query(query, [docId], function(error) {
      couchbaseContext.disconnect(customer360Bucket);
      
      if(error) {
        return callback(error);
      }

      callback();
    })
  }

  var customerRepository = {
    findCustomerByCountryCode: findCustomerByCountryCode,
    createNewCustomer: createNewCustomer,
    updateCustomerFirstAndLastName: updateCustomerFirstAndLastName,
    deleteCustomer: deleteCustomer
  };

  return customerRepository;
}

module.exports = getCustomerRepository;
