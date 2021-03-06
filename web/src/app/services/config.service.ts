import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import UrlBuilder from 'rest-api-url-builder';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnInit {

  public readonly AREA_URI_LABEL = 'areas';
  public readonly COMPLEXITY_URI_LABEL = 'complexities';
  public readonly SEARCH_QUESTIONS_URI_LABEL = 'searchQuestions';
  public readonly RANDOM_QUESTIONS_URI_LABEL = 'randomQuestions';

  public readonly SEACH_QUESTIONS_QUERY_PARAM_AREA_LABEL = 'area';
  public readonly SEACH_QUESTIONS_QUERY_PARAM_CATEGORY_LABEL = 'category';
  public readonly SEACH_QUESTIONS_QUERY_PARAM_COMPLEXITY_LABEL = 'complexity';
  public readonly SEACH_QUESTIONS_QUERY_PARAM_SEARCH_PHRASE_LABEL = 'key';

  private apiConfig: any = {};
  private feedbackRecipients : any[];
  private options: any = {};

  constructor(public httpClient: HttpClient){}
  
  ngOnInit() { }

  public initService() {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
        this.apiConfig = environment.apiConfig;   
        this.feedbackRecipients = environment.feedbackRecipients;       
        this.options = { 'baseURL': this.apiConfig.baseURL };
        resolve(true);
   });
  }

  public getConfig() : any[] {
    return this.apiConfig;
  }

  public getUrlBuilder() : UrlBuilder {
    return new UrlBuilder(this.apiConfig.routes, this.options);
  }

  public getFeedbackRecipientsList() : any[] {
    return this.feedbackRecipients;
  }
}
