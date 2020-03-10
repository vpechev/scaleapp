import { Request, Response } from 'express';
import { QuestionsService } from '../services/questionsService';

export class QuestionsController {
    private readonly MAX_ELEMENTS_RETURNED_BY_SEARHC_COUNT = 25;

    constructor(private service : QuestionsService) {}

    public getRandomQuestions(req: Request, res: Response) {
        let resultEntitiesCount = 10;
        let requestEntitiesCount = Number(req.query.count);
        
        if(!!requestEntitiesCount) {
            resultEntitiesCount = requestEntitiesCount; 
        }
        
        this.service.getRandomQuestions(resultEntitiesCount).then(result => res.json(result));
    }

    public getQuestionsByCriteria(req: Request, res: Response) {
        let area = req.query.area;
        let category = req.query.category;
        let complexity : number = req.query.complexity;
        let searchedString = req.query.key;
        
        this.service.search(area, category, complexity, searchedString).then(result => {
            let responseArr = result;
            if(!!result && result.length > this.MAX_ELEMENTS_RETURNED_BY_SEARHC_COUNT) {
                responseArr = this.getRandomSubarray(result, this.MAX_ELEMENTS_RETURNED_BY_SEARHC_COUNT);
            }
            res.json(responseArr)
        });
    }

    private getRandomSubarray(arr: any[], size: number) : any[] {
        var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
    
}