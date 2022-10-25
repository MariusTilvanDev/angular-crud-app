import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoFormComponent } from './to-do/components/to-do-form/to-do-form.component';
import { ToDoListComponent } from './to-do/components/to-do-list/to-do-list.component';
import { ToDoFilterPipe } from './to-do/pipes/to-do-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToDoFormComponent,
    ToDoListComponent,
    ToDoFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
