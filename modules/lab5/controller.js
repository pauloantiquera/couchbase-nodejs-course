function getLab5ModuleController() {
    var WebSocketServer = require('ws').Server;
    var DocumentFilesProcessor = require('./documentFilesProcessor');
    var ClientConnectionHandler = require('./clientConnectionHandler');

    function processFinishCallback(error, documents) {
        if (error) {
            return console.error(error);
        }
    }

    function doImportDataFromUploadedFiles(request, response) {
        const WEBSOCKETSERVER_PORT = 3276;

        var documentFiles = request.files;
        var webSocketServer = new WebSocketServer({ port: WEBSOCKETSERVER_PORT });
        var documentFilesProcessor = new DocumentFilesProcessor(documentFiles);
        var clientConnectionHandler = new ClientConnectionHandler(documentFilesProcessor, webSocketServer);

        response.render('progressReport', {
            pageTitle: 'Processing Progress Report',
            wsURI: 'ws://localhost:' + WEBSOCKETSERVER_PORT,
            doneMessage: clientConnectionHandler.DONE_MESSAGE,
            thanksMessage: clientConnectionHandler.THANKS_MESSAGE,
            progressMessageType: clientConnectionHandler.PROGRESS_MESSAGE_TYPE,
            errorMessageType: clientConnectionHandler.ERROR_MESSAGE_TYPE
        });

        webSocketServer.on(
            'connection',
            (clientConnection) => {
                console.log('We got a client connection :)');
                clientConnectionHandler.handleConnection(clientConnection, processFinishCallback);
            }
        );

    }

    var lab5Controller = {
        importDataFromUploadedFiles: doImportDataFromUploadedFiles
    };

    return lab5Controller;

}

module.exports = getLab5ModuleController;