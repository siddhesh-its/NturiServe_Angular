import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('loggedInUser');
    this.loggedInUserSubject = new BehaviorSubject<any>(
      user ? JSON.parse(user) : null
    );
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserValue(): any {
    return this.loggedInUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>('http://localhost:5000/users/login', { email, password })
      .pipe(
        tap((data) => {
          if (data?.msg === 'SUCCESS') {
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            this.loggedInUserSubject.next(data.user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }
}
