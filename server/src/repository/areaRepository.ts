import { MongoAdapter } from './mongoAdapter';
import { Area } from '../models/area.model';

export class AreaRepository {
    private mongoAdapter: MongoAdapter;
    private collection: string;
  
    constructor() { 
        this.mongoAdapter = new MongoAdapter();
        this.collection = this.mongoAdapter.getAreaCollectionName();
    }

    public getAll() : Promise<Area[]> {
        let dbCollectionName = this.collection;
        return this.mongoAdapter.connectToMongo(function(database:any) {
            return database.collection(dbCollectionName).find().toArray();
      });
    }
}