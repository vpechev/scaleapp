const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const xlsxParser = require('xlsx');

module.exports = {
  readXlsxFile(inputFileName) {
    let workbook = xlsxParser.readFile(inputFileName);
    return workbook;
  },

  parseSheetToJson(sheet){
    let jsonData = xlsxParser.utils.sheet_to_json(sheet);
    return jsonData;
  },
}
