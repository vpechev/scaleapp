import { Injectable, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private urlBuilder;

  private readonly searchQuestionsBaseURL;
  private readonly getRandomQuestionsBaseURL;

  constructor(private httpClient: HttpClient, private configService: ConfigService) { 
    this.urlBuilder = this.configService.getUrlBuilder();
    this.getRandomQuestionsBaseURL = this.urlBuilder.build(this.configService.RANDOM_QUESTIONS_URI_LABEL);
    this.searchQuestionsBaseURL = this.urlBuilder.build(this.configService.SEARCH_QUESTIONS_URI_LABEL);
  }

  public getRandomQuestions(count: number) : Observable<Question[]> {
    const searchURL = this.getRandomQuestionsBaseURL.setQueryParameter('count', count).get();

    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public getByArea(areaKey: string) : Observable<Question[]> {
    const searchURL = this.searchQuestionsBaseURL.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_AREA_LABEL, areaKey).get();
    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public getByComplexity(areaKey: string) : Observable<Question[]> {
    const searchURL = this.searchQuestionsBaseURL.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_COMPLEXITY_LABEL, areaKey).get();
    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public getByAreaAndCategory(areaKey: string, categoryKey: string) : Observable<Question[]> {
    const searchURL = this.searchQuestionsBaseURL
                      .setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_AREA_LABEL, areaKey)
                      .setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_CATEGORY_LABEL, categoryKey)
                      .get();

    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public search(searchValue: string, area: string, category: string, complexity: string) : Observable<Question[]> {
    const searchUrlBuilder = this.searchQuestionsBaseURL;
    
    if(!!area) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_AREA_LABEL, area);
    }

    if(!!category) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_CATEGORY_LABEL, category);
    }

    if(!!complexity) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_COMPLEXITY_LABEL, complexity);
    }

    if(!!searchValue) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_SEARCH_PHRASE_LABEL, searchValue);
    }
    
    return this.httpClient.get(searchUrlBuilder.get()) as Observable<Question[]>;
  }
}
