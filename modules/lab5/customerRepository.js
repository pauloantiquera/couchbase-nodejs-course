var util = require('util');

var AbstractRepository = require('./abstractRepository');

var customerRepositoryInstance;

function CustomerRepository() {
    AbstractRepository.call(this, 'customer');
}

util.inherits(CustomerRepository, AbstractRepository);

function create(customerData, customerCreationCallback) {
    var customer = CustomerRepository.super_.prototype.create(customerData);

    customer.save(customerCreationCallback);
}

CustomerRepository.prototype.create = create;

function getInstance() {
    if (!customerRepositoryInstance) {
        customerRepositoryInstance = new CustomerRepository();
    }

    return customerRepositoryInstance;
}

var customerRepositorySingleton = {
    getInstance: getInstance
};

module.exports = customerRepositorySingleton;