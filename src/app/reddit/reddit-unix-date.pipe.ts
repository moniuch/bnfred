import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redditUnixDate',
  pure: true,
})
export class RedditUnixDatePipe extends DatePipe implements PipeTransform {

  transform(value: number, format = 'y/MM/dd HH:mm'): string {
    return super.transform(value * 1000, format);
  }

}
