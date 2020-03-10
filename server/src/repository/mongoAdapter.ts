import { ConfigService } from "../services/configService";

const MongoClient = require('mongodb').MongoClient;

const path = require('path');
const configDirRelativePath = path.join(__dirname, '..', '..', '..', 'config');
process.env['NODE_CONFIG_DIR'] = configDirRelativePath;

export class MongoAdapter {
    private configService = new ConfigService();
    private dbConfig = this.configService.getDbConfig();
    private readonly url = `mongodb://${this.dbConfig.host}:${this.dbConfig.port}/${this.dbConfig.dbName}`;

    public connectToMongo(callback : any) : Promise<any> {
        let url = this.url;
        let dbName = this.dbConfig.dbName;

        return new Promise(function(resolve) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err: any, db: any) {
                if(err) {
                    console.log('Error in mongoAdapter: ' + err);
                    return;
                }
                
                const database = db.db(dbName);

                let result = callback(database);
                
                // db.close();
                
                resolve(result);
            });
        })
        .then((res) => res)
        .catch((error) => console.log(error))
    }
}