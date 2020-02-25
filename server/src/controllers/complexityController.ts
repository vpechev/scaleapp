import { Response, Request } from 'express';
import { ComplexityService } from '../services/complexityService';

export class ComplexityController {
    constructor(private service : ComplexityService) {}

    public getAll(_req: Request, res: Response) {
        res.json(this.service.getAll());
    }
}