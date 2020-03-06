import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complexityColor'
})
export class ComplexityColorPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch(value) {
      case 0: return 'info'
      case 1: return 'primary'
      case 2: return 'success'
      case 3: return 'warning'
      case 4: return 'danger'
    }
  }
  
}
