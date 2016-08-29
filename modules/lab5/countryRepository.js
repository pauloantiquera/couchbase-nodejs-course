var util = require('util');

var AbstractRepository = require('./abstractRepository');

var countryRepositoryInstance;
var countryCache = {};

function CountryRepository() {
    AbstractRepository.call(this, 'country');
}

util.inherits(CountryRepository, AbstractRepository);

function create(countryData, countryCreationCallback) {
    var country = CountryRepository.super_.prototype.create(countryData);

    country.save((error, result) => {
        if (!error) {
            countryCache[country.countryCode] = country;
        }

        countryCreationCallback(error, result);
    })
}

function findByCountryCode(code) {
    var country = countryCache[code];

    return country;
}

CountryRepository.prototype.create = create;
CountryRepository.prototype.findByCountryCode = findByCountryCode;

function getInstance() {
    if (!countryRepositoryInstance) {
        countryRepositoryInstance = new CountryRepository();
    }

    return countryRepositoryInstance;
}

var CountryRepositorySingleton = {
    getInstance: getInstance
};

module.exports = CountryRepositorySingleton;