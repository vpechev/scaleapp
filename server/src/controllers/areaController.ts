import { Response, Request } from 'express';
import { AreaService } from '../services/areaService';

export class AreaController {
    constructor(private service : AreaService) {}

    public getAll(_req: Request, res: Response) {
        res.json(this.service.getAll());
    }
}