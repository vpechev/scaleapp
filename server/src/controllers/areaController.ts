import { Response, Request } from 'express';
import { AreaService } from '../services/areaService';

export class AreaController {
    private service : AreaService = new AreaService();

    constructor() {}

    public getAll(_req: Request, res: Response) {
        this.service.getAll().then(result => res.json(result));
    }
}