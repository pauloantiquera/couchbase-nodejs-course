function parseDocumentFromFileData(fileData) {
    return JSON.parse(fileData);
}

function prepareDocumentToPersist(document) {
    delete document.type;
    delete document.id;

    return document;
}

var documentUtils = {
    parseDocumentFromFileData: parseDocumentFromFileData,
    prepareDocumentToPersist: prepareDocumentToPersist
};

module.exports = documentUtils;