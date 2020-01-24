import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Area } from '../enums/area.enum';
import { Category } from '../enums/category.enum';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import UrlBuilder from 'rest-api-url-builder';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  private options = {
    'baseURL': 'http://localhost:4200/api'
  };
  
  private routes = {
    'searchQuestions': '/questions/search',
    'randomQuestions': '/questions/random'
  };

  private urlBuilder = new UrlBuilder(this.routes, this.options);

  constructor(private httpClient: HttpClient) { }

  public getRandomQuestions(count: number) : Observable<Question[]> {
    const searchURL = this.urlBuilder.build('randomQuestions')
    .setQueryParameter('count', count)
    .get();

    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public getByArea(area: Area) : Observable<Question[]> {
    const searchURL = this.urlBuilder.build('searchQuestions')
    .setQueryParameter('area', area)
    .get();
    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public getByAreaAndCategory(area: Area, category: Category) : Observable<Question[]> {
    const searchURL = this.urlBuilder.build('searchQuestions')
    .setQueryParameter('area', area)
    .setQueryParameter('category', category)
    .get();

    return this.httpClient.get(searchURL) as Observable<Question[]>;
  }

  public search(searchValue: string, area: string, category: string) : Observable<Question[]> {

    const searchUrlBuilder = this.urlBuilder.build('searchQuestions');
    if(!!area) {
      searchUrlBuilder.setQueryParameter('area', area);
    }

    if(!!category) {
      searchUrlBuilder.setQueryParameter('category', category)
    }

    if(!!searchValue) {
      searchUrlBuilder.setQueryParameter('key', searchValue)
    }
    
    return this.httpClient.get(searchUrlBuilder.get()) as Observable<Question[]>;
  }
}
