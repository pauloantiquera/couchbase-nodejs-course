var ottoman = require('ottoman');

var DbContext = require('./dbContext');
var entityCreatorFactory = require('./entityCreatorFactory');

var entity;
var dbContext;

function AbstractRepository(entityName) {
    if (!entityName) {
        throw new Error('A entity name must be provided.');
    }

    entity = createRepositoryEntity(entityName);
}

function initializeDbContext() {
    dbContext = new DbContext();
}

function initializeOttomanBucket() {
    ottoman.bucket = dbContext.openCustomer360_odmBucket();
}

function createRepositoryEntity(entityName) {
    initializeDbContext();
    initializeOttomanBucket();

    var createEntity = entityCreatorFactory(entityName);

    return createEntity(ottoman);
};

function create(entityData, creationCallback) {
    entity.create(entityData, creationCallback);
}

AbstractRepository.prototype.create = create;

module.exports = AbstractRepository;