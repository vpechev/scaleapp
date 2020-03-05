var MongoClient = require('mongodb').MongoClient;

var path = require('path');
const configDirRelativePath = path.join(__dirname, '..', '..', 'config');
process.env['NODE_CONFIG_DIR'] = configDirRelativePath;

const csvParser = require('./csv-parser');
const configService = require('./services/configService');

const inputSheetsNames = configService.getInputSheetsNamesList();
const url = configService.getDbConnectionString();
const dbConfig = configService.getDbConfig();

function run() {
    if(!inputSheetsNames) {
        throw error('You need to provide input CSV files');
    }

    inputSheetsNames.forEach(fileName => csvParser.parseCsvToJsonArray(fileName, (data) => storeToDb(data)));
}

function storeToDb(questionsArr) {
    MongoClient.connect(url, function(err, db) {
        db.db(dbConfig['dbName']).collection(`${dbConfig['collections']['questionsCollectionName']}`).insertMany(questionsArr, function(err, res) {
            if (err) 
                throw err;

            console.log("Number of questions inserted: " + res.insertedCount);
            db.close();
        });
    });
}

run();


