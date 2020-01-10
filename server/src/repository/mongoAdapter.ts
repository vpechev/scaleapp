const MongoClient = require('mongodb').MongoClient;

const path = require('path');
const configDirRelativePath = path.join(__dirname, '..', '..', '..', 'config');
process.env['NODE_CONFIG_DIR'] = configDirRelativePath;

const config = require('config');
const dbConfig = config.get('ScaleAppConfig.dbConfig');
const url = `mongodb://${dbConfig.host}:${dbConfig.port}`;

export class MongoAdapter {
    public connectToMongo(callback : any) : Promise<any> {
        return new Promise(function(resolve) {
            MongoClient.connect(url, function(err: any, db: any) {
                if(err) {
                    console.log('Error in mongoAdapter: ' + err);
                }
                
                const collection = db.db(dbConfig.dbName).collection(dbConfig.questionsCollectionName);

                // collection.createIndexes(
                //     [
                //         {name: 'field1', key: { 'question': 1 }}, 
                //         {name: 'field2', key: { 'answer': 1 }}
                //     ]);

                let result = callback(collection);
                
                db.close();
                
                resolve(result);
            });
        })
        .then((res) => res)
        .catch((error)=>console.log(error))
    }
}