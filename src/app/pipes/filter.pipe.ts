import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,filterdata:21){
    if(value.length == filterdata){
      return value;
    }
  }

}
