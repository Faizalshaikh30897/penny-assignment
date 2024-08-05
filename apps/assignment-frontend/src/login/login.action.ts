import { createAction, props } from '@ngrx/store';
import { User } from '@assignment/user';

export const login = createAction(
  '[Login] User Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);