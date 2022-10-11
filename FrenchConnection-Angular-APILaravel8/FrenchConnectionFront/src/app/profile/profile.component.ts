import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  faceurl?: string;

  constructor(private token: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    //console.log(this.currentUser);

    this.displayFace();
  }

  displayFace() {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results[0].picture.medium)
        this.faceurl = data.results[0].picture.medium;
      });
  }

  updateUserPage(): void {
    console.log(this.currentUser.id);
    this.router.navigate(['admin/user_detail', this.currentUser.user_id]);
  }
}