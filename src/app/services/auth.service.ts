import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, mapTo } from 'rxjs/operators';

import { baseUrl } from '../enviroments/enviroment';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${baseUrl}/sessions`, user, httpOptions).pipe(
      tap(data => {
        this.storeUser(data.username, data.token);
        this.router.navigate(['/todos']);
      }),
      mapTo(true),
      catchError( error  => {
        return error.status === 0 ? of('server') : of(false);
      })
    );
  }

  logout() {
    this.removeUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (!localStorage.getItem('token')) {
      this.removeUser();
      return false;
    }
    return true;
  }

  register(user: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${baseUrl}/users`, user, httpOptions).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      }),
      mapTo(true),
      catchError(({ error }) => {
        return of(error.error);
      })
    );
  }

  private storeUser(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  }

  private removeUser() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

}
