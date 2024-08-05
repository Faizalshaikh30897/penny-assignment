import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { loginFailure, loginSuccess } from './login.action';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginEffects {
  login$;
  loginFailure$;

  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthenticationService
  ) {
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType('[Login] User Login'),
        switchMap(({ email, password }) =>
          this.authService.login(email, password).pipe(
            map(({ access_token, user }) => loginSuccess({ user })),
            catchError((error) => {
              console.log('error', error);
              this.store.dispatch(loginFailure({ error: error.error.message }));
              return of(loginFailure({ error: error.error.message }));
            })
          )
        )
      )
    );
    this.loginFailure$ = createEffect(
      () => this.actions$.pipe(ofType('[Login] Login Failure')),
      { dispatch: false }
    );
  }
}
