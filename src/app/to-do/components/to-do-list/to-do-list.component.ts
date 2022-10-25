import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDo } from '../../models/to-do';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  /** List of data  */
  items: Array<ToDo>;

  /** Filter value */
  listFilter: string;

  /** Boolean value to be able to displat the modal form */
  showModal = false;

  /** Selected data */
  selectedItem: ToDo;

  /** Define table columns with field name and header */
  cols = [
    { field: 'id', header: 'Id' },
    { field: 'userId', header: 'User Id' },
    { field: 'title', header: 'Type' },
  ];

  /** Array of subscriptions */
  private subscriptions: Subscription[] = [];

  constructor(private service: ToDoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.refresh();
  }

  /**
   * Refresh ToDo table
   */
  refresh() {
    this.subscriptions.push(
      this.service.getToDos().subscribe((res: Array<ToDo>) => {
        this.items = res;
      })
    );
  }

  /**
   * Action event called after click the delete button in table
   * Remove ToDo entity
   */
  removeToDo(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.service.removeToDo(id).subscribe(() => {
        this.refresh();
      });
    }
  }

  /**
   * Action event called after click the edit button in table
   * Display the modal form to be able to edit the item
   */
  editToDo(item: ToDo) {
    this.selectedItem = { ...item };
    this.showModal = true;
  }

  /**
   * Action event called after click the close button in form
   */
  closePopup() {
    this.showModal = false;
    this.selectedItem = null;
    this.refresh();
  }

  /**
   * Implement ngOnDestroy to be able to
   * call unsubscribe for all subscriptions to avoid out of memory error
   */
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
