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

    let xlsxFilePath = path.join(__dirname, '..', 'input-data', 'Interview questions.xlsx');
    console.log(`Detected input file: ${xlsxFilePath}`);
    
    let workbook = csvParser.readXlsxFile(xlsxFilePath);

    let questionsArr = buildQuestionsArray(workbook);
        
    validateQuestionAnswerLength(questionsArr);

    createIndexes();
    storeToDb(questionsArr);
}

function createIndexes(){
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        let collection = getQuestionsCollection(db);
        
        dbConfig.indexes.forEach(x => collection.createIndex(x));

        db.close();
    });
}

function storeToDb(questionsArr) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        getQuestionsCollection(db).insertMany(questionsArr, function(err, res) {
            if (err) {
                throw err;
            }

            console.log("Number of questions inserted: " + res.insertedCount);
            db.close();
        });
    });
}

function buildQuestionsArray(workbook) {
    let questionsArr = [];
    inputSheetsNames.forEach(sheetName => {
        let sheet = workbook.Sheets[sheetName];
        let jsonDataArr = csvParser.parseSheetToJson(sheet);
        jsonDataArr.forEach(x => x.area = sheetName);
        questionsArr = questionsArr.concat(jsonDataArr);
    });

    return questionsArr;
}

function getQuestionsCollection(db){
    return db.db(dbConfig['dbName']).collection(`${dbConfig['collections']['questionsCollectionName']}`);
}

function validateQuestionAnswerLength(questionsArr){
    let count = 0;
    questionsArr.forEach(x => {
        if(x.answer && x.answer.length > 900) {
            console.log(x.area + " >>> " + x.question);
            count++;
        }
    });

    if(count > 0) {
        console.log(`Potentional entities with too large answer: ${count} records. They might break the creation of indexes. Maximal allowed length is 1024 bytes`);
    }
}

run();


