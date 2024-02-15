import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teaDescription'
})
export class TeaDescriptionPipe implements PipeTransform {

  transform(text: string): string {
    if (text.length > 80) {
      text = text.substring(0, 80) + "...";
    }
    return text;
  }

}
