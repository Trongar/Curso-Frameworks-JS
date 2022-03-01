import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'espar'
})
export class EsparPipe implements PipeTransform {

  transform(value: any) {
    let espar = " no es par";
    if (value % 2 == 0){
      espar = " es un numero par"
    }
    return value + espar;
  }

}
