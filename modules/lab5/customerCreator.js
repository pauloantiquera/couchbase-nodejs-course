function getCustomerModel() {
    var customerModel = {
        'username': { type: 'string', readonly: true },
        'firstName': 'string',
        'lastName': 'string',
        'created': 'Date',
        'billingAddress': {
            //'country': { ref: Country },
            'country': 'string',
            'state': 'string',
            'city': 'string',
            'line1': 'string',
            'postalCode': 'string'
        },
        'updated': 'Date',
        'email': 'string'
    };

    return customerModel;
}


var customerModelId = { id: 'username' };

function createCustomer(ottoman) {
    var customerModel = getCustomerModel();
    return ottoman.model('Customer', customerModel, customerModelId);
}

var customerCreator = {
    create: createCustomer
};

module.exports = customerCreator;