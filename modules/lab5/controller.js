function getLab5ModuleController() {
    var WebSocketServer = require('ws').Server;

    var uploadDocumentsProcessor = require('./uploadDocumentsProcessor')();

    function doImportDataFromUploadedFiles(request, response) {
        const WEBSOCKETSERVER_PORT = 3276;
        const DONE_MESSAGE = 'done';
        const THANKS_MESSAGE = 'thanks';
        const PROGRESS_MESSAGE_TYPE = 'progress-message';
        const ERROR_MESSAGE_TYPE = 'error-message';

        var webSocketServer = new WebSocketServer({ port: WEBSOCKETSERVER_PORT });
        var documents = request.files;

        webSocketServer
            .on('connection', function(ws) {
                console.log('Client connected :)');

                uploadDocumentsProcessor.processDocuments(documents)
                    .on(uploadDocumentsProcessor.PROGRESS_EVENT, (current) => {
                        var progressObject = {
                            type: PROGRESS_MESSAGE_TYPE,
                            current: current,
                            total: documents.length
                        };

                        ws.send(JSON.stringify(progressObject), (error) => {
                            if (error) {
                                return console.log(error);
                            }
                        });
                    })
                    .on(uploadDocumentsProcessor.ERROR_EVENT, (error) => {
                        var errorObject = {
                            type: ERROR_MESSAGE_TYPE,
                            error: error
                        };

                        ws.send(JSON.stringify(errorObject));
                    })
                    .on(uploadDocumentsProcessor.DONE_EVENT, (documents) => {
                        ws.send(DONE_MESSAGE);
                        console.log(documents.length + ' documents');
                    });

                ws.on('message', (message) => {
                    if (message === THANKS_MESSAGE) {
                        webSocketServer.close();
                    }
                });
            });

        response.render('progressReport', {
            pageTitle: 'Processing Progress Report',
            wsURI: 'ws://localhost:' + WEBSOCKETSERVER_PORT,
            doneMessage: DONE_MESSAGE,
            thanksMessage: THANKS_MESSAGE,
            progressMessageType: PROGRESS_MESSAGE_TYPE,
            errorMessageType: ERROR_MESSAGE_TYPE
        });
    }

    var lab5Controller = {
        importDataFromUploadedFiles: doImportDataFromUploadedFiles
    };

    return lab5Controller;

}

module.exports = getLab5ModuleController;