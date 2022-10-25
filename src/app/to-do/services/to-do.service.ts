import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToDo } from '../models/to-do';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor(private http: HttpClient) {}

  /** Get ToDo entity by id */
  getToDo(id: number): Observable<ToDo> {
    return this.http
      .get<ToDo>(`${environment.apiBaseUrl}/todos/${id}`)
      .pipe(catchError((error: any) => _throw(error)));
  }

  /** Get all entities */
  getToDos(): Observable<ToDo[]> {
    return this.http
      .get<any[]>(`${environment.apiBaseUrl}/todos`)
      .pipe(catchError((error: any) => _throw(error)));
  }

  /** Create ToDo entity */
  createToDo(payload: ToDo): Observable<ToDo> {
    return this.http
      .post<ToDo>(`${environment.apiBaseUrl}/todos`, payload)
      .pipe(catchError((error: any) => _throw(error)));
  }

  /** Update ToDo entity */
  updateToDo(id: number, payload: ToDo): Observable<ToDo> {
    return this.http
      .put<ToDo>(`${environment.apiBaseUrl}/todos/${id}`, payload)
      .pipe(catchError((error: any) => _throw(error)));
  }

  /** Remove ToDo entity */
  removeToDo(id: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiBaseUrl}/todos/${id}`)
      .pipe(catchError((error: any) => _throw(error)));
  }
}
