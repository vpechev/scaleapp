import { Request, Response } from 'express';
import { QuestionsService } from '../services/QuestionsService';
import { Area } from '../enums/area.enum';
import { Category } from '../enums/category.enum';
import { Complexity } from '../enums/complexity.enum';

export class QuestionsController{
    private service : QuestionsService = new QuestionsService();

    constructor() {}

    public getRandomQuestions(req: Request, res: Response) {
        this.service.getRandomQuestions(Number(req.query.count)).then(result => res.json(result));
    }

    public getQuestionsByCriteria(req: Request, res: Response) {
        let area : Area = req.query.area;
        let category : Category = req.query.category;
        let complexity : Complexity = req.query.complexity;
        let searchedString = req.query.key;
        
        this.service.search(area, category, complexity, searchedString).then(result => res.json(result));
    }
    
}