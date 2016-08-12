function getResponseHandler() {
  function respondWithErrorOrResult(error, result, response) {
    if (error) {
      return response.status(500).json(error);
    }

    if (result.length == 0) {
      return response.status(204).end();
    }

    response.json(result);
  }

  function respondWithErrorOrCreated(error, docId, request, response) {
    var url = require('url');

    if (error) {
      return response.status(500).json(error);
    }

    var uri = url.format({
      protocol: request.protocol,
      host: request.get('host'),
      pathname: request.originalUrl + '/' + docId
    });

    response.status(201).location(uri).json({'docId': docId});
  }

  function respondWithErrorOrOk(error, response) {
    if (error) {
      return response.status(500).json(error);
    }    

    response.status(200).end();
  }

  var responseHandler = {
    respondWithErrorOrResult: respondWithErrorOrResult,
    respondWithErrorOrCreated: respondWithErrorOrCreated,
    respondWithErrorOrOk: respondWithErrorOrOk
  };

  return responseHandler;
}

module.exports = getResponseHandler;
