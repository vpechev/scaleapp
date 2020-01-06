const csvParser = require('./csv-parser');
    
function etl() {
    console.log('START');
    let fileName = 'Java.csv';
    let collectionName = fileName.substring(0, fileName.lastIndexOf('.'));
    let questionsArray = csvParser.parseCsvToJsonArray(fileName);

    console.log("questions-etl.js => QuestionsArr " + questionsArray);

    csvParser.dropCollection(collectionName);

    // csvParser.storeToDb(collectionName, questionsArr);
    
    console.log('DONE! ');
}

(()=>{
    etl();
})();