const csv = require('csv-parser');
const fs = require('fs');

let questionsArray = csvParser.parseCsvToJsonArray('Java.csv')

console.log("questions-etl.js => QuestionsArr " + questionsArray)


