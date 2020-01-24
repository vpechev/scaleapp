import {Application, Request, Response} from "express";
import { QuestionsController } from "../controllers/questionsController";

export class Routes { 
    
    public questionsController: QuestionsController = new QuestionsController();
    
    public routes(app: Application): void {
        app.route('/api/questions/random').get((req: Request, res: Response) => this.questionsController.getRandomQuestions(req, res))
        app.route('/api/questions/search').get((req: Request, res: Response) => this.questionsController.getQuestionsByCriteria(req, res))
    }
}