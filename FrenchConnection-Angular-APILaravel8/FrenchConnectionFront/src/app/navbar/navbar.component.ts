import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role_id?: number;
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      // console.log(user);
      this.role_id = user.role_id;
      this.showAdminBoard = this.role_id == 4 ? true : false;

      // console.log('thisRole', this.role_id);

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

