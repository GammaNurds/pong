import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(array: Array<any>, args?: any): Array<any> {
        return _.orderBy(array, [args[0]], ['desc']);
    }
}
