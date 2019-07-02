import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(list: {}[], field: string) {
    if (!field) return list;

    return list.filter(obj => {
      if (obj.hasOwnProperty(field))
        return obj[field]
    });
  }
}
