import { AreaRepository } from '../repository/areaRepository';
import { Area } from '../models/area.model';

export class AreaService {
  constructor(private repository: AreaRepository) {}

  public getAll() : Area[] {
    return this.repository.getAll();
  }
}