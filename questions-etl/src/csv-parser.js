const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  parseCsvToJsonArray : function(fileName, callback) {
    let questions = [];

    const jsonPath = path.join(__dirname, '..', 'input-data', fileName);

    fs.createReadStream(jsonPath)
    .pipe(csv())
    .on('data', (row) => {
      questions.push({
        'category' : row.Category,
        'complexity' : row.Complexity,
        'question' : row.Questions,
        'answer' : row['Sample Answer'],
        'notes' : row['Additional Notes']
      })
    })
    .on('end', () => {
      console.log(`CSV file successfully processed. Array contains ${questions.length} elements`);
      callback(questions)
    });
  }
}
