function getCountryRepository() {
  var couchbaseContext = require('./db-context')();

  function getCountryById(id, callback) {
    var customer360Bucket = couchbaseContext.open();
    var query = couchbaseContext.createQuery('SELECT * FROM customer360 USE KEYS ($1)');

    customer360Bucket.query(query, [id], function(error, rows) {
      if (error) {
        return callback(error);
      }

      couchbaseContext.disconnect(customer360Bucket);

      console.log(rows);      

      callback(null, rows);
    });
  }

  var countryRepository = {
    findCountryById: getCountryById
  };

  return countryRepository;
}

module.exports = getCountryRepository;