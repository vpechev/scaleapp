const MongoClient = require('mongodb').MongoClient;

const path = require('path');
const configDirRelativePath = path.join(__dirname, '..', '..', '..', 'config');
process.env['NODE_CONFIG_DIR'] = configDirRelativePath;

const config = require('config');
const dbConfig = config.get('ScaleAppConfig.dbConfig');
const url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

export class MongoAdapter {
    public connectToMongo(callback : any) : Promise<any> {
        return new Promise(function(resolve) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err: any, db: any) {
                if(err) {
                    console.log('Error in mongoAdapter: ' + err);
                    return;
                }
                
                const database = db.db(dbConfig.dbName);

                let result = callback(database);
                
                db.close();
                
                resolve(result);
            });
        })
        .then((res) => res)
        .catch((error) => console.log(error))
    }

    public getAreaCollectionName() {
        return dbConfig.areaCollectionName;
    }

    public getQuestionsCollectionName() {
        return dbConfig.questionsCollectionName;
    }

    public getComplexityCollectionName() {
        return dbConfig.complexityCollectionName;
    }
}