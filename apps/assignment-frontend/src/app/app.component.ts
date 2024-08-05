import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoginModule } from '../login/login.module';
import { HomeComponent } from '../home/home.component';
import { AuthenticationService } from '../login/authentication.service';


@Component({
  standalone: true,
  selector: 'app-root',
  providers: [],
  imports: [NxWelcomeComponent, HomeComponent, RouterModule, LoginModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'assignment-frontend';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
