import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../models/to-do';

/** todoFilter pipe is used to filter the items in table */
@Pipe({
  name: 'todoFilter',
})
export class ToDoFilterPipe implements PipeTransform {
  transform(value: ToDo[], filterBy: string): ToDo[] {
    filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filterBy && value
      ? value.filter(
          (e: ToDo) => e.title.toLocaleLowerCase().indexOf(filterBy) !== -1
        )
      : value;
  }
}
