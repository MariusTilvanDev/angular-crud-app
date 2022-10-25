import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoFormComponent } from './to-do/components/to-do-form/to-do-form.component';
import { ToDoListComponent } from './to-do/components/to-do-list/to-do-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'to-do', pathMatch: 'full' },
  {
    path: 'to-do',
    component: ToDoListComponent,
  },
  {
    path: 'to-do/new',
    component: ToDoFormComponent,
  },
  {
    path: 'to-do/:todoId',
    component: ToDoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
