import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.errorMessage = '';
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.authenticationService
      .register(
        this.registerForm.get('name')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm?.get('password')?.value
      )
      .subscribe(
        (res) => {
          this.errorMessage = '';
          console.log(res, 'res');
          
        },
        (err) => {
          this.errorMessage = err.error.message;
          console.log(err, 'register error');
        }
      );
  }
}
