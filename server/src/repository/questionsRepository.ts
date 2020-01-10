import { Question } from '../models/question.model'
import { MongoAdapter } from './mongoAdapter';
// import { Area } from '../enums/area.enum'
// import { Category } from '../enums/category.enum'
// import { Complexity } from '../enums/complexity.enum'

export class QuestionsRepository {
    private mongoAdapter: MongoAdapter;
  
    constructor() { 
        this.mongoAdapter = new MongoAdapter();
    }

    public getRandomQuestions(count: number) : Promise<Question[]> {
        return this.mongoAdapter.connectToMongo(function(collection:any) {
            return collection.aggregate([{$sample: {size: count}}]).toArray();    
        });
    }

    public getByCriteria(criteria : any) : Promise<Question[]> {
        return this.mongoAdapter.connectToMongo(function(collection:any) {
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
                query.complexity = criteria.complexity;
            }

            return collection.find(query).toArray();    
        });
    }

    // public getByArea(area: Area) : Question[] {
    //     return this.serverData.filter(x => {
    //         if(!!area) {
    //         return x.area === area
    //         } else {
    //         return this.getRandomQuestions();
    //         }
    //     });
    // }

    // public getByAreaAndCategory(area: Area, category: Category) : Question[] {
    //     return this.serverData.filter(x => {
    //         if(!!category) {
    //         return x.area === area && x.category === category;
    //         } else {
    //         return x.area === area;
    //         }
            
    //     });
    // }

    // public search(searchValue: string) : Question | undefined {
    //         return this.serverData.find(x => {
    //         return x.question.includes(searchValue) || x.answer.includes(searchValue) 
    //     });
    // }

}