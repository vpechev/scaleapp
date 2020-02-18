import { Response, Request } from 'express';
import { ComplexityService } from '../services/complexityService';

export class ComplexityController {
    private service : ComplexityService = new ComplexityService();

    constructor() {}

    public getAll(_req: Request, res: Response) {
        this.service.getAll().then(result => res.json(result));
    }
}