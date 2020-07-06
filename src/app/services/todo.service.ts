import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { baseUrl } from '../enviroments/enviroment';

import { Todo } from '../models/Todo';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  token: string;
  httpOptions: object;

  getTodos(): Observable<Todo[]> {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.http.get<Todo[]>(`${baseUrl}/todos`, this.httpOptions).pipe(
      catchError(error => {
        this.authService.logout();
        return of([]);
      })
    );
  }

  addTodo(todo: Todo): Observable<any>{
    const url = `${baseUrl}/todos`;
    return this.http.post(url, todo, this.httpOptions);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${baseUrl}/todos/${todo.id}`;
    return this.http.put(url, todo, this.httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const url = `${baseUrl}/todos/${todo.id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
