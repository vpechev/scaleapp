import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of, Observable, ObservableInput } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import UrlBuilder from 'rest-api-url-builder';

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

  private config: any = {};
  private urlBuilder: UrlBuilder;

  constructor(public httpClient: HttpClient){}
  
  ngOnInit() { }

  public initService() {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      this.httpClient.get('assets/config/config.json')
        .pipe(
          map((x: ConfigService) => {
            this.config = x['ScaleAppConfig']['apiConfig'];
            
            let options = {
              'baseURL': this.config['baseURL']
            };

            this.urlBuilder = new UrlBuilder(this.config['routes'], options);

            resolve(true);
          }),
          catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
            console.log(`Error while initializing configuration ${x}`);
            if (x.status !== 404) {
              resolve(false);
            }
            
            resolve(true);
            return of({});
          })
        ).subscribe();
   });
  }

  public getConfig() : any[] {
    return this.config;
  }

  public getUrlBuilder() : UrlBuilder {
    return this.urlBuilder;
  }
}
