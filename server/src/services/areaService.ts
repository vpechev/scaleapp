import { AreaRepository } from '../repository/areaRepository';
import { Area } from '../models/area.model';

export class AreaService {
  private repository: AreaRepository = new AreaRepository();

  constructor() {}

  public getAll() : Promise<Area[]> {
    return this.repository.getAll();
  }
}