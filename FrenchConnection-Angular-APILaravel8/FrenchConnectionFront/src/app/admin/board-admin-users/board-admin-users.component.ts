import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from 'src/app/types/user.model';
import { findIndex } from 'rxjs';
import { UsersListComponent } from '../user/users-list/users-list.component';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin-users.component.html',
  styleUrls: ['./board-admin-users.component.css'],
})
export class BoardAdminUsersComponent implements OnInit {
  content?: string;
  users: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        // console.log('dataUser', data);
        this.users = data.data.users;
        // console.log('datasUsers', this.users);
      },
      error: (e) => console.error(e),
    });
  }
}
