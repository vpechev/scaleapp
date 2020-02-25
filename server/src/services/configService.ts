var c = require('config');

export class ConfigService {
    private dbConfig : { host: string, port: number, dbName: string, collections: { questionsCollectionName: string } };
    private apiConfig : { port: number, routes: {areas: string, complexities: string, searchQuestions: string, randomQuestions: string }};
    private areasSchemaPath: string;
    private complexitiesSchemaPath: string;


    constructor() { 
        let configurationName = 'ScaleAppConfig';
        this.dbConfig = c.get(`${configurationName}.dbConfig`); 
        this.apiConfig = c.get(`${configurationName}.apiConfig`);
        this.areasSchemaPath = c.get(`${configurationName}.areasSchemaPath`)
        this.complexitiesSchemaPath = c.get(`${configurationName}.complexitiesSchemaPath`)
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