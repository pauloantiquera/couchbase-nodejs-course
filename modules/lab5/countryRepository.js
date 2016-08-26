var util = require('util');

var AbstractRepository = require('./abstractRepository');

var countryRepositoryInstance;

function CountryRepository() {
    AbstractRepository.call(this, 'country');
}

util.inherits(CountryRepository, AbstractRepository);

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