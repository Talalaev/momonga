import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: string): string {
    try {
      let [leftPart, rightPart] = String(value).split('.');

      if (!rightPart) rightPart = '00';
      if (rightPart.length === 1) rightPart += '0';

      leftPart = leftPart.split('').reverse().reduce((prev, next, index) => {
        if (index === 0) return prev += next;
        if (index%3 === 0) return prev += ` ${next}`;

        return prev += next;
      }, '').split('').reverse().join('');

      return `${leftPart},${rightPart}`;
    } catch(e) {
      console.warn(e);
      return value;
    }
  }
}
