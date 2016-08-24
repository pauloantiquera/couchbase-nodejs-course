function getLab5ModuleApi(app) {
  if (!app) {
    throw new Error('A express app instance is required!');
  }

  var express = require('express');
  var multer = require('multer');

  var lab5Controller = require('./controller')();

  var router = express.Router();
  var uploader = multer({dest: __dirname + '/uploads/'});

  app.set('views', __dirname + '/views');
  app.set('view engine', 'pug');

  router.use('/', express.static(__dirname + '/public', {index: 'filesUploadForm.html'}));
  router.post('/documents', uploader.array('docs'), lab5Controller.importDataFromUploadedFiles);

  return router;
}

module.exports = getLab5ModuleApi;