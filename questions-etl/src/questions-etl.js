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

    xlsxFilePath = path.join(__dirname, '..', 'input-data', 'Interview questions.xlsx');
    console.log('file path: ' + xlsxFilePath);
    
    let workbook = csvParser.readXlsxFile(xlsxFilePath);

    let questionsArr = [];
    inputSheetsNames.forEach(fileName => {
        let sheet = workbook.Sheets[fileName];
        let jsonDataArr = csvParser.parseSheetToJson(sheet);
        jsonDataArr.forEach(x => x['area'] = fileName);
        questionsArr = questionsArr.concat(jsonDataArr);
    });
    storeToDb(questionsArr);

    //inputSheetsNames.forEach(fileName => csvParser.parseCsvToJsonArray(fileName, (data) => storeToDb(data)));
}

function storeToDb(questionsArr) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        db.db(dbConfig['dbName']).collection(`${dbConfig['collections']['questionsCollectionName']}`).insertMany(questionsArr, function(err, res) {
            if (err) {
                throw err;
            }

            console.log("Number of questions inserted: " + res.insertedCount);
            db.close();
        });
    });
}

run();


