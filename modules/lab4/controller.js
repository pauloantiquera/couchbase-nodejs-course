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
    var customerDoc = request.body;

    customerRepository.createNewCustomer(customerDoc, function(error, result) {
      responseHandler.respondWithErrorOrCreated(error, result, request, response);
    });
  }

  function doUpdateCustomerFirstAndLastName(request, response) {
    var customerDocId = request.params.id;
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;

    customerRepository.updateCustomerFirstAndLastName(customerDocId, firstName, lastName, function(error) {
      responseHandler.respondWithErrorOrOk(error, response);
    });
  }

  function doDeleteCustomer(request, response) {
    var customerDocId = request.params.id;

    customerRepository.deleteCustomer(customerDocId, function(error) {
      responseHandler.respondWithErrorOrNoContent(error, response);
    });
  }

  var controller = {
    findCountryById: doFindCountryById,
    findCustomerByCountryCode: doFindCustomerByCountryCode,
    createNewCustomer: doCreateNewCustomer,
    updateCustomerFirstAndLastName: doUpdateCustomerFirstAndLastName,
    deleteCustomer: doDeleteCustomer
  };

  return controller;
}

module.exports = getLab4ModuleController;
