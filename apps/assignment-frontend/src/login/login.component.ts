import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Store } from '@ngrx/store';
import { login } from './login.action';
import { selectError } from './login.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store
  ) {}

  ngOnInit() {
    this.errorMessage = '';
    this.store
      .select(selectError)
      .subscribe((err) => (this.errorMessage = err));
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    // console.log(this.store, 'xxx');
    this.store.dispatch(
      login({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm!.get('password')?.value,
      })
    );
    // this.authenticationService
    //   .login(
    //     this.loginForm.get('email')?.value,
    //     this.loginForm!.get('password')?.value
    //   )
    //   .subscribe(
    //     (res) => {
    //       console.log('res', res);
    //       this.errorMessage = '';
    //     },
    //     (err) => {
    //       this.errorMessage = err.error.message;
    //       console.log('error in login', err);
    //     }
    //   );
  }
}
