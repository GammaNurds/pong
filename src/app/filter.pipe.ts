import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items: any[], condition: any, reverse: boolean): any[] {

        let filterProperty = Object.keys(condition)[0];
        if (!items) {
            return [];
        }
        if (reverse) {
            return items.filter(o => o[filterProperty] !== condition[filterProperty]);
        } else {
            return items.filter(o => o[filterProperty] === condition[filterProperty]);
        }

    }

}
