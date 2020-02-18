import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.model';
import { ConfigService } from './config.service';
import { Complexity } from '../models/complexity.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {
  private urlBuilder;

  constructor(private httpClient: HttpClient, private configurationService: ConfigService) { 
    this.urlBuilder = this.configurationService.getUrlBuilder();
  }

  public getAllAreas() : Observable<Area[]> {
    const searchURL = this.urlBuilder.build(this.configurationService.AREA_URI_LABEL).get();

    return this.httpClient.get(searchURL) as Observable<Area[]>;
  }

  public getComplexityOptions() : Observable<Complexity[]> {
    const searchURL = this.urlBuilder.build(this.configurationService.COMPLEXITY_URI_LABEL).get();

    return this.httpClient.get(searchURL) as Observable<Area[]>;
  }
}
