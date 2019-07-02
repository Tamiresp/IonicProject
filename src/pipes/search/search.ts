import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
 
  transform(list: {}[], field: string, value: string) {
    if (!value) return list;

    return list.filter(obj => {
      if (obj.hasOwnProperty(field))
        return obj[field].includes(value)
    });
  }
  
}
