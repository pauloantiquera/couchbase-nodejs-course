function getCreateFunctionFor(entityName) {
    if (!entityName) {
        throw new Error('A entity name is required');
    }

    var creatorPath = './' + entityName + 'Creator';

    try {
        var creator = require(creatorPath);
        return creator.create;
    } catch (error) {
        throw new Error('No creator found for the given entity name ' + entityName + ' ( ' + error.message + ' )');
    }
}

var entityCreatorFactory = {
    getCreateFunctionFor: getCreateFunctionFor
};

module.exports = getCreateFunctionFor;