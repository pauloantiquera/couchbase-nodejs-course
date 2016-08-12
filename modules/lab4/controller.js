function getLab4ModuleController() {
  var countryRepository = require('./country-repository')();
  var customerRepository = require('./customer-repository')();
  var responseHandler = require('./response-handler')();


  function doFindCountryById(request, response) {
    
    var countryId = request.params.id;

    countryRepository.findCountryById(countryId, function(error, result) {
      responseHandler.respondWithErrorOrResult(error, result, response);
    });
  }

  function doFindCustomerByCountryCode(request, response) {
    var countryCode = request.params.code;

    customerRepository.findCustomerByCountryCode(countryCode, function(error, result) {
      responseHandler.respondWithErrorOrResult(error, result, response);
    });
  }

  function doCreateNewCustomer(request, response) {
    var customerDocument = request.body;

    customerRepository.createNewCustomer(customerDocument, function(error, result) {
      responseHandler.respondWithErrorOrCreated(error, result, request, response);
    });
  }

  var controller = {
    findCountryById: doFindCountryById,
    findCustomerByCountryCode: doFindCustomerByCountryCode,
    createNewCustomer: doCreateNewCustomer
  }

  return controller;
}

module.exports = getLab4ModuleController;
