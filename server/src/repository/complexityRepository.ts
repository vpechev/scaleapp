import { MongoAdapter } from './mongoAdapter';
import { Complexity } from '../models/complexity.model';

export class ComplexityRepository {
    private mongoAdapter: MongoAdapter;
    private collection: string;
  
    constructor() { 
        this.mongoAdapter = new MongoAdapter();
        this.collection = this.mongoAdapter.getComplexityCollectionName();
    }

    public getAll() : Promise<Complexity[]> {
        let dbCollectionName = this.collection;
        return this.mongoAdapter.connectToMongo(function(database:any) {
            return database.collection(dbCollectionName).find().toArray();
      });
    }
}