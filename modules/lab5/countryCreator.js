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

function doCreateCountry(ottoman) {
    if (!Country) {
        console.log('No country');
        Country = ottoman.model('Country', countryModel, countryModelId);
    }

    return Country;
}

var countryCreator = {
    create: doCreateCountry
};

module.exports = countryCreator;