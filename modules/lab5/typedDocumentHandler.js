var documentPersistenceFactory = require('./documentPersistenceFactory');
var documentUtils = require('./documentUtils');

function persist(document) {
    var persistDocument = documentPersistenceFactory(document.type);
    var readyDocument = documentUtils.prepareDocumentToPersist(document);

    persistDocument(readyDocument, (error, result) => {
        if (error) {
            return console.error(error);
        }
    });
}

var typedDocumentHandler = {
    persist: persist
};

module.exports = typedDocumentHandler;