import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correctAnsweredQuestionColor'
})
export class CorrectAnsweredQuestionColorPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    switch(value) {
      case 0: return 'text-light';
      case 1: return 'text-success';
      case 2: return 'text-light';
      case 3: return 'text-success';
      case 4: return 'text-success';
      default: return 'text-success';
    }
  }

}
