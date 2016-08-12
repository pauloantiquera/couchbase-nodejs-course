function getCustomerRepository() {
  var couchbaseContext = require('./db-context')();

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

  var customerRepository = {
    findCustomerByCountryCode: findCustomerByCountryCode
  };

  return customerRepository;
}

module.exports = getCustomerRepository;
