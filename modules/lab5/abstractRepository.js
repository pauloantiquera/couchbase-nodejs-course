var entityCreatorFactory = require('./entityCreatorFactory');

var Entity;
var dbContext;
var entityCache = {};

function AbstractRepository(entityName) {
    if (!entityName) {
        throw new Error('A entity name must be provided.');
    }

    Entity = createRepositoryEntity(entityName);
}

function createRepositoryEntity(entityName) {
    var createEntity = entityCreatorFactory(entityName);

    return createEntity();
};

function create(entityData, creationCallback) {
    var entity = new Entity(entityData);

    return entity;
}

AbstractRepository.prototype.create = create;

module.exports = AbstractRepository;