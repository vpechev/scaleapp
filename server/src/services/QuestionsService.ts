import { Question } from '../models/question.model'
import { QuestionsRepository } from '../repository/questionsRepository';

export class QuestionsService {
  constructor(private repository: QuestionsRepository) {}

  public getRandomQuestions(count: number) : Promise<Question[]> {
    return this.repository.getRandomQuestions(count);
  }

  public search(areaKey: string, categoryKey: string, complexityKey: number, searchValue: string) : Promise<Question[]> {
    let criteria = {
      area: areaKey,
      category: categoryKey, 
      complexity: complexityKey,
      searchValue: searchValue
    };

    return this.repository.getByCriteria(criteria);
  }
}