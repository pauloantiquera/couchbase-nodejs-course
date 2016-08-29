var CustomerRepository = require('./customerRepository');
var CountryRepository = require('./countryRepository');

var customerRepository = CustomerRepository.getInstance();
var countryRepository = CountryRepository.getInstance();

function createCustomerDocument(customerData, customerCreationCallback) {
    var country = countryRepository.findByCountryCode(customerData.billingAddress.country);

    customerData.billingAddress.country = country;

    customerRepository.create(customerData, customerCreationCallback);
}

module.exports = createCustomerDocument;