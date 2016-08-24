var EventEmitter = require('events');
var util = require('util');
var fs = require('fs');
var async = require('async');

const PROGRESS_EVENT = 'progress';
const DONE_EVENT = 'done';
const ERROR_EVENT = 'error';

var documents = [];
var documentFiles;

function DocumentFilesProcessor(_documentFiles_) {
    documentFiles = _documentFiles_;
    EventEmitter.call(this);
}

util.inherits(DocumentFilesProcessor, EventEmitter);

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

        eventEmitter.emit(PROGRESS_EVENT, index + 1, files.length);
        interateDocuments(files, index + 1, eventEmitter);
    });
}

function doProcessDocuments() {
    var eventEmitter = this;
    process.nextTick(() => {
        interateDocuments(documentFiles, 0, eventEmitter)
    });
}

DocumentFilesProcessor.prototype.processDocuments = doProcessDocuments;
DocumentFilesProcessor.prototype.PROGRESS_EVENT = PROGRESS_EVENT;
DocumentFilesProcessor.prototype.DONE_EVENT = DONE_EVENT;
DocumentFilesProcessor.prototype.ERROR_EVENT = ERROR_EVENT;

module.exports = DocumentFilesProcessor;