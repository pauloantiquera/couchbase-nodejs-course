var CustomerRepository = require('./customerRepository');

var customerRepository = CustomerRepository.getInstance();

module.exports = customerRepository.create;