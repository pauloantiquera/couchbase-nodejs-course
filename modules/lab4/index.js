function getLab4ModuleApi() {
  var express = require('express');

  var lab4Controller = require('./controller')();

  var router = express.Router();

  router.get('/country/:id', lab4Controller.findCountryById);
  router.get('/customers/:code', lab4Controller.findCustomerByCountryCode);
  router.post('/customers', lab4Controller.createNewCustomer);
  router.put('/customers/:id', lab4Controller.updateCustomerFirstAndLastName);
  router.delete('/customers/:id', lab4Controller.deleteCustomer);

  return router;
}

module.exports = getLab4ModuleApi;
