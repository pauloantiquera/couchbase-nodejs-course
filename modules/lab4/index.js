function getLab4ModuleApi() {
  var express = require('express');

  var lab4Controller = require('./controller')();

  var router = express.Router();

  router.get('/country/:id', lab4Controller.findCountryById);

  return router;
}

module.exports = getLab4ModuleApi;
