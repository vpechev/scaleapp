import { Question } from '../models/question.model'
import { MongoAdapter } from './mongoAdapter';
import { ConfigService } from '../services/configService';

export class QuestionsRepository {
    private mongoAdapter: MongoAdapter;
    private collection: string;
  
    constructor(configService: ConfigService) { 
        this.mongoAdapter = new MongoAdapter();
        this.collection = configService.getDbConfig().collections.questionsCollectionName;
    }

    public getRandomQuestions(count: number) : Promise<Question[]> {
        let dbCollectionName = this.collection;

        return this.mongoAdapter.connectToMongo(function(database:any) {
            return database.collection(dbCollectionName).aggregate([{$sample: {size: count}}]).toArray();    
        });
    }

    public getByCriteria(criteria : any) : Promise<Question[]> {
        let dbCollectionName = this.collection;

        return this.mongoAdapter.connectToMongo(function(database:any) {
            let query : any = {};
            
            if(criteria.searchValue) {
                query['$text'] = { $search: criteria.searchValue };
            }

            if(criteria.area) {
                query.area = criteria.area;
            }

            if(criteria.category) {
                query.category = criteria.category;
            }

            if(criteria.complexity) {
                query.complexity = +criteria.complexity;
            }

            return database.collection(dbCollectionName).find(query).toArray();    
        });
    }
}