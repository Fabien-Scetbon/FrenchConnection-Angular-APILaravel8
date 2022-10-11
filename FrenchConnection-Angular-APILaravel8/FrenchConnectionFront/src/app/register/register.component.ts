import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {} from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: '../register/register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errors?: null;
  form: any = {
    role_id: 1,
    role: 'User',
   
    username: null,
    email: null,
    address: null,
    phone: null,
    password: null,
    password_confirmation: null,
  };

   

  isLoggedIn = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log('loggin true');
      this.isLoggedIn = true;
    }
  }

  ngDoCheck() {
    if (this.form.role_id != 0) {
      this.form.role = this.userService.getRolebyRoleId(this.form.role_id);
      console.log(this.form.role);
    }
  }

  onSubmit(): void {
    const {
      role_id,
      username,
      email,
      address,
      phone,
      password,
      password_confirmation,
    } = this.form;
    if (password !== password_confirmation) {
      this.errorMessage = 'Passwords do not match !';
      console.log(this.errorMessage);
      return;
    } else {
      console.log('thisForm', this.form);
      this.authService.register(this.form).subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (err) => {
          console.log('register failed');
          this.errorMessage = err.message;
          console.log('this.errorMessage', this.errorMessage);
          this.isSignUpFailed = true;
        },
      });
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
