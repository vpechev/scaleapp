import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complexityColor'
})
export class ComplexityColorPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch(value) {
      case 0: return 'bg-info text-light';
      case 1: return 'bg-primary text-light';
      case 2: return 'bg-success text-light';
      case 3: return 'bg-warning text-dark';
      case 4: return 'bg-danger text-light';
      default: return 'bg-light text-dark';
    }
  }
  
}
