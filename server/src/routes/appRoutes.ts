import { Application, Request, Response } from "express";
import { QuestionsController } from "../controllers/questionsController";
import { AreaController } from "../controllers/areaController";
import { ComplexityController } from "../controllers/complexityController";

const config = require('config');
const routes = config.get('ScaleAppConfig.apiConfig.routes');

export class Routes { 
    private questionsController: QuestionsController = new QuestionsController();
    private areaController: AreaController = new AreaController();
    private complexityController: ComplexityController = new ComplexityController();
    
    public routes(app: Application): void {
        app.route(routes.randomQuestions).get((req: Request, res: Response) => this.questionsController.getRandomQuestions(req, res))
        app.route(routes.searchQuestions).get((req: Request, res: Response) => this.questionsController.getQuestionsByCriteria(req, res))
        app.route(routes.areas).get((req: Request, res: Response) => this.areaController.getAll(req, res))
        app.route(routes.complexities).get((req: Request, res: Response) => this.complexityController.getAll(req, res))
    }
}