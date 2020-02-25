import { ComplexityRepository } from '../repository/complexityRepository';
import { Complexity } from '../models/complexity.model';

export class ComplexityService {
  constructor(private repository: ComplexityRepository) {}

  public getAll() : Complexity[] {
    return this.repository.getAll();
  }
}