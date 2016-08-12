function getLab4ModuleController() {
  var countryRepository = require('./country-repository')();
  var customerRepository = require('./customer-repository')();

  function respondWithErrorOrResult(response, error, result) {
    if (error) {
      return response.status(500).json(error);
    }

    if (result.length == 0) {
      return response.status(204).end();
    }

    response.json(result);
  }

  function doFindCountryById(request, response) {
    
    var countryId = request.params.id;

    countryRepository.findCountryById(countryId, function(error, result) {
      respondWithErrorOrResult(response, error, result);
    });
  }

  function doFindCustomerByCountryCode(request, response) {
    var countryCode = request.params.code;

    customerRepository.findCustomerByCountryCode(countryCode, function(error, result) {
      respondWithErrorOrResult(response, error, result);
    });
  }

  var controller = {
    findCountryById: doFindCountryById,
    findCustomerByCountryCode: doFindCustomerByCountryCode
  }

  return controller;
}

module.exports = getLab4ModuleController;