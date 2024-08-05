import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../shared/token.interceptor';
import { provideStore, StoreModule } from '@ngrx/store';
import { loginReducer } from '../login/login.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { LoginEffects } from '../login/login.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(loginReducer),
    // importProvidersFrom(StoreModule.forRoot({ state: loginReducer })),
    provideEffects(LoginEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(HttpClientModule),
   
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
};
