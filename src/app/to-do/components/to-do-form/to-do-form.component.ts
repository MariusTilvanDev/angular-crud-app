import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDo } from '../../models/to-do';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css'],
})
export class ToDoFormComponent implements OnInit, OnDestroy {
  /** Data of ToDo entity */
  @Input() item: ToDo;

  /** Action event for closing the popup */
  @Output() closePopupEvent = new EventEmitter();

  /** Form definition with fields and validation */
  form: FormGroup = this.fb.group({
    userId: [
      '',
      {
        validators: Validators.required,
        updateOn: 'blur',
      },
    ],
    title: ['', Validators.required],
  });

  /** Boolean value to be able to distinguish between edit/create form */
  isEdit = false;

  /** Form title */
  formTitle = 'Create';

  /** Array of subscriptions */
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ToDoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.item?.id) {
      this.formTitle = 'Edit';
      this.isEdit = true;
      this.form.patchValue(this.item);
    }
  }

  /** Action event called after click the create button in form  */
  createToDo() {
    if (this.form.valid) {
      this.service.createToDo(this.form.value).subscribe(() => {
        this.closePopupEvent.emit();
      });
    } else {
      alert('All the fields are required');
    }
  }

  /** Action event called after click the save button in form  */
  updateToDo() {
    if (this.form.valid) {
      this.service.updateToDo(this.item.id, this.form.value).subscribe(() => {
        this.closePopupEvent.emit();
      });
    } else {
      alert('All the fields are required');
    }
  }

  /**
   * Action event called after click the cancel button in form
   * Emit the "closePopupEvent" outpup event
   */
  cancel() {
    this.closePopupEvent.emit();
  }

  /** Return the value of userId field   */
  get userId() {
    return this.form.get('userId');
  }

  /** Return the value of title field   */
  get title() {
    return this.form.get('title');
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
