import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Area } from '../enums/area.enum';
import { Category } from '../enums/category.enum';
import { Complexity } from '../enums/complexity.enum';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  constructor() { }

  private serverData = [
    new Question("1", "I want to ask you smth but it is very long long long long message. Longer than expected.", "Here is a sample answer of your questions. Here is a sample answer of your questions. Here is a sample answer of your questions. Here is a sample answer of your questions. Here is a sample answer of your questions. Here is a sample answer of your questions", Area.java, Category.spring, Complexity.easy),
    new Question("2", "I have another questions", "and another answer from me", Area.database, Category.sql, Complexity.standard),
    new Question("3", "Do you have soft skills?", "No I don't have.... :( ", Area.database, Category.docker, Complexity.master)
  ]

  public getRandomQuestions() : Question[] {
      return this.serverData.slice(0,2)
  }

  public getByArea(area: Area) : Question[] {
      return this.serverData.filter(x => {
        if(!!area) {
          return x.area === area
        } else {
          return this.getRandomQuestions();
        }
      });
  }

  public getByAreaAndCategory(area: Area, category: Category) : Question[] {
      return this.serverData.filter(x => {
        if(!!category) {
          return x.area === area && x.category === category;
        } else {
          return x.area === area;
        }
        
      });
  }

  public search(searchValue: string, area: string, category: string) : Question {
      return this.serverData.find(x => {

        if(!!area && !!category) {
          return x.area === area && x.category === category && (x.question.includes(searchValue) || x.answer.includes(searchValue));
        } else if(!!area){
          return x.area === area && (x.question.includes(searchValue) || x.answer.includes(searchValue));
        } else {
          return x.question.includes(searchValue) || x.answer.includes(searchValue);
        }
      });
  }
}
