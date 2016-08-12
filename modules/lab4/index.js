function getLab4ModuleApi() {
  var express = require('express');

  var lab4Controller = require('./controller')();

  var router = express.Router();

  router.get('/country/:id', lab4Controller.findCountryById);
  router.get('/customers/:code', lab4Controller.findCustomerByCountryCode);

  return router;
}

module.exports = getLab4ModuleApi;
