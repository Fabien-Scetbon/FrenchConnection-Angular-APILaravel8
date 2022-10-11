import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  errors?: null;
  user: any = [];

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  utilsRole = ';'

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params['id']);
     const utils = this.tokenStorageService.getUser();
     // console.log(user);
     this.utilsRole = utils.role_id;
  }

  onSubmit(): void {
    //console.log('thisUserInUpdate', this.user);
    this.userService.update(this.user.id, this.user).subscribe({
      next: (data) => {
        // console.log('dataUserUpdate', data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        //console.log('register failed');
        this.errorMessage = err.message;
        //console.log('this.errorMessage', this.errorMessage);
        this.isSignUpFailed = true;
      },
    });
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        // console.log('dataUser', data);
        this.user = data.data.user;
        console.log('datasUser', this.user.role_id);
      },
      error: (e) => console.error(e),
    });
  }
}
