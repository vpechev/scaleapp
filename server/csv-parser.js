var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbName = 'scaleApp'
module.exports = {
  parseCsvToJsonArray : function(fileName) {
    let questions = [];

    fs.createReadStream('input-data/' + fileName)
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
      console.log('CSV file successfully processed. Array contains ' + questions.length + ' elements');
      return questions
    });
  },

  storeToDb : function(collectionName, questionsArr) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });

      questionsArr
      dbo.collection(collectionName).insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });

    });

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { name: "Company Inc", address: "Highway 37" };
      dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
   
  }
}
