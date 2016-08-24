function getDocumentsProcessor() {
    var async = require('async');
    var fs = require('fs');
    var EventEmitter = require('events');

    const PROGRESS_EVENT = 'progress';
    const DONE_EVENT = 'done';
    const ERROR_EVENT = 'error';

    var documents = [];

    function readFile(file) {
        return JSON.parse(fs.readFileSync(file.path));
    }

    function deleteFile(file) {
        return fs.unlinkSync(file.path);
    }

    function processFile(file, fileProcessCallback) {
        async.waterfall(
            [
                (fileReadCallback) => {
                    var document = readFile(file);
                    fileReadCallback(null, file, document);
                },
                (fileProcessed, document, fileDeleteCallback) => {
                    deleteFile(fileProcessed);
                    fileDeleteCallback(null, document);
                }
            ],
            function(error, result) {
                return fileProcessCallback(error, result);
            }
        );
    }

    function finish(eventEmitter) {
        eventEmitter.emit(DONE_EVENT, documents);
    }

    function interateDocuments(files, index, eventEmitter) {
        if (index === files.length) {
            return finish(eventEmitter);
        }

        var file = files[index];

        processFile(file, function(error, document) {
            if (error) {
                eventEmitter.emit(ERROR_EVENT, error);
            } else {
                documents.push(document);
            }

            eventEmitter.emit(PROGRESS_EVENT, index + 1);
            interateDocuments(files, index + 1, eventEmitter);
        });
    }

    function doProcessDocuments(files) {
        var eventEmitter = new EventEmitter();

        process.nextTick(() => {
            interateDocuments(files, 0, eventEmitter)
        });

        return eventEmitter;
    }

    var documentsProcessor = {
        PROGRESS_EVENT: PROGRESS_EVENT,
        DONE_EVENT: DONE_EVENT,
        ERROR_EVENT: ERROR_EVENT,
        processDocuments: doProcessDocuments
    };

    return documentsProcessor;
}

module.exports = getDocumentsProcessor;