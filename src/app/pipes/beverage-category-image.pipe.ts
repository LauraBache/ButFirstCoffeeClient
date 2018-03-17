import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beverageCategoryImage'
})
export class BeverageCategoryImagePipe implements PipeTransform {

  transform(value: string, args?: any): string {

    if (value == 'Coffee')
    {
      return 'assets/img/coffee-cup.jpg';
    }

    if (value == 'Tea')
    {
      return 'assets/img/tea-cup.jpg';
    }
  }
}
