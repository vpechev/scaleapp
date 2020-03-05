var path = require('path');
const fs = require('fs');

const configurationName = 'ScaleAppConfig';
const environment = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'default';

console.log("Environment: " + environment);

const configurationFilePath = path.join(__dirname, '..', '..', '..', 'config',`${environment}.json`);
    
console.log("Configuration file location: " + configurationFilePath);

const configuration = JSON.parse(fs.readFileSync(configurationFilePath));
const dbConfig = configuration[`${configurationName}`]['dbConfig']; 
const inputSheetsNames = configuration[`${configurationName}`]['inputSheetsNames'];

module.exports = {
    getDbConfig : function() {
        return dbConfig;
    },
    getDbConnectionString : function() {
        return `mongodb://${dbConfig['host']}:${dbConfig['port']}/${dbConfig['dbName']}`
    },
    getInputSheetsNamesList : function() {
        return inputSheetsNames
    }
}