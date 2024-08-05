import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from './authenticator.client';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private store: Store,
  ) {}

  public login(email: string, password: string) {
    console.log('login call');
    return this.authenticationClient.login(email, password).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.access_token);
        this.router.navigate(['/home']);
      })
    );
  }

  public register(name: string, email: string, password: string) {
    const observable = this.authenticationClient.register(
      name,
      email,
      password
    ).pipe(tap((res) => {
      localStorage.setItem(this.tokenKey, res.token);
      this.router.navigate(['/home']);
    }));
    return observable;
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
