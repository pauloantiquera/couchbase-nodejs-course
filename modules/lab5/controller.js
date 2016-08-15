function getLab5Controller() {
  var fs = require('fs');

  function processDocumentsFiles(files) {
    for (var i = 0; i < files.length; i++) {
      file = files[i];      

      fs.unlinkSync(file.path);

      console.log(file.originalname + ' (' + file.filename + ') succesfuly processed!');
    }
  }

  function importDataFromUploadedFile(request, response) {
    processDocumentsFiles(request.files);
    response.json(request.files);
  }
  
  var controller = {
    importDataFromUploadedFile: importDataFromUploadedFile
  };

  return controller;
}

module.exports = getLab5Controller;
