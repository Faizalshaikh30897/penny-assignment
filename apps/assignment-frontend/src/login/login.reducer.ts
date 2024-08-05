import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess } from './login.action';
import { User } from '@assignment/user';

export interface State {
  user: User | null;
  error: string;
}

const initialState: State = {
  user: null,
  error: '',
};

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => {
    console.log('login event', state);
    return { ...state, isLoading: true };
  }),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(loginFailure, (state, { error }) => {
    console.log('login failure', error);
    return {
      ...state,
      error,
    };
  })
);
