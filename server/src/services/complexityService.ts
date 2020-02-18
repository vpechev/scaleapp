import { ComplexityRepository } from '../repository/complexityRepository';
import { Complexity } from '../models/complexity.model';

export class ComplexityService {
  private repository: ComplexityRepository = new ComplexityRepository();

  constructor() {}

  public getAll() : Promise<Complexity[]> {
    return this.repository.getAll();
  }
}