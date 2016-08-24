const PROGRESS_MESSAGE_TYPE = 'progress-message';
const ERROR_MESSAGE_TYPE = 'error-message';
const DONE_MESSAGE = 'done';
const THANKS_MESSAGE = 'thanks';

var documentFilesProcessor;
var serverSocket = null;

function ClientConnectionHandler(_documentFilesProcessor_, _serverSocket_) {
    if (!_documentFilesProcessor_) {
        throw new Error('A documentoFilesProcessor is required.');
    }

    documentFilesProcessor = _documentFilesProcessor_;
    serverSocket = _serverSocket_;

}

function generateProgressReportObject(current, total) {
    var progressReportObject = {
        type: PROGRESS_MESSAGE_TYPE,
        current: current,
        total: total
    };

    return progressReportObject;
}

function generateErrorObject(error) {
    var errorObject = {
        type: ERROR_MESSAGE_TYPE,
        error: error
    };

    return errorObject;
}

function messageSentCallback(error) {
    if (error) {
        return console.error(error);
    }
}

function sendMessageToClient(clientConnection, objectToSend) {
    clientConnection.send(JSON.stringify(objectToSend), messageSentCallback);
}

function handleProgressEvent(current, total, clientConnection) {
    var progressReportObject = generateProgressReportObject(current, total);

    sendMessageToClient(clientConnection, progressReportObject, messageSentCallback);
}

function handleErrorEvent(error, clientConnection) {
    var errorObject = generateErrorObject(error);

    sendMessageToClient(clientConnection, errorObject);
}

function handleDoneEvent(documents, clientConnection, serverSocket, processFinishCallback) {
    clientConnection.send(DONE_MESSAGE);

    clientConnection.on(
        'message',
        (message) => {
            if (message === THANKS_MESSAGE) {
                return serverSocket.close()
            }
        }
    );

    processFinishCallback(null, documents);
}

function handleConnection(clientConnection, processFinishCallback) {

    documentFilesProcessor.on(
        documentFilesProcessor.PROGRESS_EVENT,
        (current, total) => {
            handleProgressEvent(current, total, clientConnection);
        }
    );

    documentFilesProcessor.on(
        documentFilesProcessor.ERROR_EVENT,
        (error) => {
            handleErrorEvent(error, clientConnection);
        }
    );

    documentFilesProcessor.on(
        documentFilesProcessor.DONE_EVENT,
        (documents) => {
            handleDoneEvent(documents, clientConnection, serverSocket, processFinishCallback);
        }
    );

    documentFilesProcessor.processDocuments();
}

ClientConnectionHandler.prototype.PROGRESS_MESSAGE_TYPE = PROGRESS_MESSAGE_TYPE;
ClientConnectionHandler.prototype.ERROR_MESSAGE_TYPE = ERROR_MESSAGE_TYPE;
ClientConnectionHandler.prototype.DONE_MESSAGE = DONE_MESSAGE;
ClientConnectionHandler.prototype.THANKS_MESSAGE = THANKS_MESSAGE;
ClientConnectionHandler.prototype.handleConnection = handleConnection;

module.exports = ClientConnectionHandler;