import { Request, Response } from 'express';
import { QuestionsService } from '../services/questionsService';

export class QuestionsController {
    private service : QuestionsService = new QuestionsService();

    constructor() {}

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
        let complexity = req.query.complexity;
        let searchedString = req.query.key;
        
        this.service.search(area, category, complexity, searchedString).then(result => res.json(result));
    }
    
}