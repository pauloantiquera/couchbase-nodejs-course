var DbContext = require('./dbContext');

var countryModel = {
    'countryCode': { type: 'string', readonly: true },
    'gdp': 'number',
    'region-number': 'number',
    'name': 'string',
    'updated': 'Date',
    'population': 'number'
};

var countryModelId = { id: 'countryCode' };

var Country;

function doCreateCountry() {
    var dbContext = DbContext.getDbContextInstance();

    if (!Country) {
        Country = dbContext.createModelFor('Country', countryModel, countryModelId);
    }

    return Country;
}

var countryCreator = {
    create: doCreateCountry
};

module.exports = countryCreator;