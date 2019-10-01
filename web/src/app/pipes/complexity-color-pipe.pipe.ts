import { Pipe, PipeTransform } from '@angular/core';
import { Complexity } from '../enums/complexity.enum';

@Pipe({
  name: 'complexityColorPipe'
})
export class ComplexityColorPipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch(value) {
      case Complexity.fundamental: return 'info'
      case Complexity.easy: return 'primary'
      case Complexity.standard: return 'success'
      case Complexity.hard: return 'warning'
      case Complexity.master: return 'danger'
    }
  }

}
