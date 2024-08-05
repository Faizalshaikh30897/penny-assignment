import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@assignment/user';

const apiUrl = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(
    email: string,
    password: string
  ): Observable<{ access_token: string, user: User }> {
    return this.http.post(apiUrl + '/user/login', {
      email: email,
      password: password,
    }) as any;
  }

  public register(
    name: string,
    email: string,
    password: string
  ): Observable<User & { token: string }> {
    return this.http.post(
      apiUrl + '/user/register',
      {
        name,
        email: email,
        password: password,
      },
      {
        responseType: 'json',
      }
    ) as any;
  }
}
