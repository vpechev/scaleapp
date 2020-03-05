var path = require('path');
const fs = require('fs');

export class ConfigService {
    private dbConfig : { host: string, port: number, dbName: string, collections: { questionsCollectionName: string } };
    private apiConfig : { port: number, routes: {areas: string, complexities: string, searchQuestions: string, randomQuestions: string }};
    private areasSchemaPath: string;
    private complexitiesSchemaPath: string;

    constructor() { 
        let configurationName = 'ScaleAppConfig';
        let environment = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'default';

        console.log("Environment: " + environment);

        let configurationFilePath = path.join(__dirname, '..', '..', '..', 'config',`${environment}.json`);
        
        console.log("Configuration file location: " + configurationFilePath);

        let configuration = JSON.parse(fs.readFileSync(configurationFilePath));

        this.dbConfig = configuration[`${configurationName}`].dbConfig; 
        this.apiConfig = configuration[`${configurationName}`].apiConfig;
        this.areasSchemaPath = configuration[`${configurationName}`].areasSchemaPath;
        this.complexitiesSchemaPath = configuration[`${configurationName}`].complexitiesSchemaPath;
    }

    public getDbConfig() {
        return this.dbConfig;
    }

    public getApiConfig() {
        return this.apiConfig;
    }

    public getServerPort() : number {
        return this.apiConfig.port;
    }

    public getApiRoutes() {
        return this.apiConfig.routes;
    }

    public getAreasSchemaPathConfig() {
        return this.areasSchemaPath;
    }

    public getComplexitiesSchemaPathConfig() {
        return this.complexitiesSchemaPath;
    }

    public getDbConnectionString() {
        return `mongodb://${this.dbConfig.host}:${this.dbConfig.port}/${this.dbConfig.dbName}`
    }
}