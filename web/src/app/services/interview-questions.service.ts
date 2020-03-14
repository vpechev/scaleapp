import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionsService {

  private answeredQuestions: Question[];
  private notAnsweredQuestions: Question[];

  constructor() { 
    this.answeredQuestions = [];
    this.notAnsweredQuestions = [];
  }

  public resetArrays() {
    this.answeredQuestions = [];
    this.notAnsweredQuestions = [];
  }

  public addAnsweredQuestion(question: Question) : void {
    this.answeredQuestions.push(question);
  }

  public addNotAnsweredQuestions(question: Question) : void { 
    this.notAnsweredQuestions.push(question);
  }

  public getAnsweredQuestions() {
    return this.answeredQuestions;
  }

  public getNotAnsweredQuestions() {
    return this.notAnsweredQuestions;
  }
}
