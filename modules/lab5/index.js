function getLab5ModuleApi() {
  var express = require('express');
  var multer = require('multer');

  var lab5Controller = require('./controller')();

  var router = express.Router();
  var uploader = multer({dest: __dirname + '/uploads/'});

  router.use('/', express.static(__dirname + '/public', {index: 'filesUploadForm.html'}));
  router.post('/documents', uploader.array('docs'), lab5Controller.importDataFromUploadedFile);

  return router;
}

module.exports = getLab5ModuleApi;