import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notName'
})
export class NotNamePipe implements PipeTransform {

    transform(value: any, name: string): any {
        //console.log(name);
        return value.filter(player => {
            return player.name !== name;
        });
    }

}
