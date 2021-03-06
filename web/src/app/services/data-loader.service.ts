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

  constructor(private httpClient: HttpClient, private configService: ConfigService) { 
    this.urlBuilder = this.configService.getUrlBuilder();
  }

  public getRandomQuestions(count: number) : Observable<Question[]> {
    const searchURL = this.urlBuilder
                        .build(this.configService.RANDOM_QUESTIONS_URI_LABEL)
                        .setQueryParameter('count', count)
                        .get();

    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public search(searchValue: string, area: string, category: string, complexity: string) : Observable<Question[]> {
    let searchUrlBuilder = this.urlBuilder.build(this.configService.SEARCH_QUESTIONS_URI_LABEL);
    
    if(!!area) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_AREA_LABEL, area);
    }

    if(!!category) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_CATEGORY_LABEL, category);
    }

    if(complexity== '0' || !!complexity) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_COMPLEXITY_LABEL, complexity);
    }

    if(!!searchValue) {
      searchUrlBuilder.setQueryParameter(this.configService.SEACH_QUESTIONS_QUERY_PARAM_SEARCH_PHRASE_LABEL, searchValue);
    }

    return this.httpClient.get(searchUrlBuilder.get()) as Observable<Question[]>;
  }
}
