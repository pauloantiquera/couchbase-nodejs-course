var DbContext = require('./dbContext');
var countryCreator = require('./countryCreator');

var Country = countryCreator.create();

var customerModel = {
    'username': { type: 'string', readonly: true },
    'firstName': 'string',
    'lastName': 'string',
    'created': 'Date',
    'billingAddress': {
        'country': { ref: Country },
        'state': 'string',
        'city': 'string',
        'line1': 'string',
        'postalCode': 'string'
    },
    'updated': 'Date',
    'email': 'string'
};

var customerModelId = { id: 'username' };

var Customer;

function createCustomer() {
    var dbContext = DbContext.getDbContextInstance();

    if (!Customer) {
        Customer = dbContext.createModelFor('Customer', customerModel, customerModelId);
    }

    return Customer;
}

var customerCreator = {
    create: createCustomer
};

module.exports = customerCreator;