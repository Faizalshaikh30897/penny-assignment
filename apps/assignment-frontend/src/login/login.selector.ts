import { createSelector } from '@ngrx/store';

const selectLogin = (state: any) => state.login;

export const selectUser = createSelector(
  selectLogin,
  (state) => state.user
);

export const selectError = createSelector(
  selectLogin,
  (state) => state.error
);