// const csv = require('csv-parser');
// const fs = require('fs');
var path = require('path');
// const csvtojsonV2=require("csvtojson");

const csv = require('csvtojson');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = 'scaleApp'

module.exports = {
  parseCsvToJsonArray : async function(fileName) {
    var csvFilePath = path.join(__dirname, 'input-data/', fileName);
    // const questions = await 
    
    csv().fromFile(csvFilePath).subscribe((json)=>{
      return new Promise((resolve,reject)=>{
          console.log(resolve);
        })
    }, (err) => {
        console.log(err);
    }, onComplete);

    return questions;

    // fs.createReadStream(filePath)
    // .pipe(csv())
    // .on('data', (row) => {
    //   questions.push({
    //     'category' : row.Category,
    //     'complexity' : row.Complexity,
    //     'question' : row.Questions,
    //     'answer' : row['Sample Answer'],  
    //     'notes' : row['Additional Notes']
    //   })
    // })
    // .on('error', (err) => {
    //   console.log('Error ny reading input file: ' + err);
    // })
    // .on('end', () => {
    //   console.log('CSV file successfully processed. Array contains ' + questions.length + ' elements');
    //   return questions
    // });
  },

  storeToDb : function(collectionName, questionsArr) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        throw err;
      } 

      let dbo = db.db(dbName);
      dbo.createCollection(collectionName, function(err, res) {
        if (err) {
          throw err;
        }

        console.log("Collection created!");

        dbo.collection(collectionName).insertMany(questionsArr, {ordered: true}, function(err, res) {
          if (err) { 
            throw err;
          }
          
          console.log("All records inserted successfully into collection: " + collectionName);
          db.close();
        });
      });

    });
  },

  dropCollection : function(collectionName) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        throw err;
      }

      var dbo = db.db(dbName);
      dbo.collection(collectionName).drop(function(err, delOK) {
        if (err) { 
          throw err;
        }
        
        if (delOK){ 
          console.log(`Collection ${collectionName} deleted`);
        }

        db.close();
      });
    });
  }
}
