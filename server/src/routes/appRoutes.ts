import { Application, Request, Response } from "express";
import { QuestionsController } from "../controllers/questionsController";
import { AreaController } from "../controllers/areaController";
import { ComplexityController } from "../controllers/complexityController";
import { ConfigService } from "../services/configService";
import { AreaService } from "../services/areaService";
import { AreaRepository } from "../repository/areaRepository";
import { ComplexityService } from "../services/complexityService";
import { ComplexityRepository } from "../repository/complexityRepository";
import { QuestionsService } from "../services/questionsService";
import { QuestionsRepository } from "../repository/questionsRepository";

export class Routes { 
    private configService: ConfigService = new ConfigService();
    private questionsController: QuestionsController = new QuestionsController(new QuestionsService(new QuestionsRepository(this.configService)));
    private areaController: AreaController = new AreaController(new AreaService(new AreaRepository(this.configService)));
    private complexityController: ComplexityController = new ComplexityController(new ComplexityService(new ComplexityRepository(this.configService)));

    private readonly routesWrapper = this.configService.getApiConfig()['routes'];

    public routes(app: Application): void {
        app.route(this.routesWrapper.randomQuestions).get((req: Request, res: Response) => this.questionsController.getRandomQuestions(req, res))
        app.route(this.routesWrapper.searchQuestions).get((req: Request, res: Response) => this.questionsController.getQuestionsByCriteria(req, res))
        app.route(this.routesWrapper.areas).get((req: Request, res: Response) => this.areaController.getAll(req, res))
        app.route(this.routesWrapper.complexities).get((req: Request, res: Response) => this.complexityController.getAll(req, res))
    }
}