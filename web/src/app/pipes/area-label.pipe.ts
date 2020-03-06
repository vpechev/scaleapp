import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../models/area.model';

@Pipe({
  name: 'areaLabel'
})
export class AreaLabelPipe implements PipeTransform {

  transform(value: any, areas: Area[]): any {
    if(!!areas && !!value) {
      return areas.find(x => x.key === value).value;
    }
    return value;
  }

}
