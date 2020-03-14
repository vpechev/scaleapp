import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incorrectAnsweredQuestionColor'
})
export class IncorrectAnsweredQuestionColorPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch(value) {
      case 0: return 'text-danger';
      case 1: return 'text-danger';
      case 2: return 'text-danger';
      case 3: return 'text-danger';
      case 4: return 'text-light';
      default: return 'text-danger';
    }
  }

}
