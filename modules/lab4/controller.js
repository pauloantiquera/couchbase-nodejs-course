function getLab4ModuleController() {
  var countryRepository = require('./country-repository')();

  function doFindCountryById(request, response) {
    
    var countryId = request.params.id;

    countryRepository.findCountryById(countryId, function(error, result) {
      if (error) {
        return response.json(error);
      }

      response.json(result);
    });

  }

  var controller = {
    findCountryById: doFindCountryById
  }

  return controller;
}

module.exports = getLab4ModuleController;