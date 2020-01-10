import { Question } from '../models/question.model'
import { Area } from '../enums/area.enum'
import { Category } from '../enums/category.enum'
import { Complexity } from '../enums/complexity.enum'
import { QuestionsRepository } from '../repository/questionsRepository';

export class QuestionsService {
  private repository: QuestionsRepository = new QuestionsRepository();

  constructor() {}

  public getRandomQuestions(count: number) : Promise<Question[]> {
      return this.repository.getRandomQuestions(count);
  }

  public search(area: Area, category: Category, complexity: Complexity, searchValue: string) : Promise<Question[]> {
    let criteria = {
      area: area,
      category: category, 
      complexity: complexity,
      searchValue: searchValue
    };

    return this.repository.getByCriteria(criteria);
  }

}