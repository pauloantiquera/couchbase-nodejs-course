var CountryRepository = require('./countryRepository');

var countryRepository = new CountryRepository.getInstance();

module.exports = countryRepository.create;