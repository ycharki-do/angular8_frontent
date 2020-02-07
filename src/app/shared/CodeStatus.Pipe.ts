import {Pipe, PipeTransform} from '@angular/core';
import {getHtmlTagDefinition} from '@angular/compiler';

@Pipe({ name: 'CodeStatus'})
export  class CodeStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if ( value === 2 ) {
      return '<div class="dif" ngClass="dif" style="background-color: cornflowerblue">Definitive</div>';
    }if ( value === 1 ) {
      return '<div class="temp" style="background-color: goldenrod">Temporal</div>';
    }if ( value === 0 ) {
      return '<div class="free" style="background-color: limegreen">Free</div>';
    }
  }

}
