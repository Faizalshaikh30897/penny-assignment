import { Route } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../login/register.component';
import { AuthGuard } from '../shared/auth.guard';
import { HomeComponent } from '../home/home.component';
import { TokenInterceptor } from '../shared/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
