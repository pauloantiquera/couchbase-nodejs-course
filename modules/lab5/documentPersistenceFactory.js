function getPersistenceFunctionFor(type) {
    if (!type) {
        throw new TypeError('A document type is required');
    }

    var documentType = type.toLowerCase();
    var modulePath = './' + documentType + 'DocumentPersister';

    try {
        return require(modulePath);
    } catch (error) {
        throw new Error('Document type not supported ( ' + error.message + ' )');
    }
}

var documentPersisterFactory = {
    getPersistenceFunctionFor: getPersistenceFunctionFor
};

module.exports = getPersistenceFunctionFor;