import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { User } from '@assignment/user';
import { AuthenticationService } from '../login/authentication.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  providers: [
    UserService
  ],
  templateUrl: './home.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  public users: User[] = [];
  public displayedColumns = ['name', 'email'];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => (this.users = res));
  }

  logout() {
    this.authenticationService.logout();
  }
}
