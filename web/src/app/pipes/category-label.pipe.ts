import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../models/area.model';

@Pipe({
  name: 'categoryLabel'
})
export class CategoryLabelPipe implements PipeTransform {

  transform(value: any, area, areas: Area[]): any {
    if(!!value && !!areas) {
      let category = areas.find(x => x.key === area).categories.find(x => x.key === value);

      if(!category) {
        console.log(`category-label.pipe >>> Oops value=${value} with area: ${area}`);
      }
      
      return category.value;
    }
    return value;
  }

}
