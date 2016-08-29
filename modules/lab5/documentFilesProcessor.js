var EventEmitter = require('events');
var util = require('util');
var fs = require('fs');
var async = require('async');
var typedDocumentHandler = require('./typedDocumentHandler');
var documentUtils = require('./documentUtils');

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

function readFile(file, fileReadeCallback) {
    var data = fs.readFile(file.path, { encoding: 'UTF-8' }, (error, fileData) => {
        if (error) {
            return fileReadeCallback(error);
        }

        fileReadeCallback(null, file, fileData);
    });
    return data;
}

function persist(fileData) {
    var document = documentUtils.parseDocumentFromFileData(fileData);
    typedDocumentHandler.persist(document);
}

function deleteFile(file, document, fileDeleteCallback) {
    return fs.unlink(file.path, (error) => {
        if (error) {
            return fileDeleteCallback(error);
        }

        fileDeleteCallback(null, document);
    });
}

function readPersistAndDeleteFilesInCascading(file, fileProcessCallback) {
    async.waterfall(
        [
            (fileReadCallback) => {
                readFile(file, fileReadCallback);
            },
            (fileRead, fileData, filePersistCallback) => {
                persist(fileData);
                filePersistCallback(null, fileRead, fileData);
            },
            (fileProcessed, document, fileDeleteCallback) => {
                deleteFile(fileProcessed, document, fileDeleteCallback);
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

    readPersistAndDeleteFilesInCascading(file, function(error, document) {
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