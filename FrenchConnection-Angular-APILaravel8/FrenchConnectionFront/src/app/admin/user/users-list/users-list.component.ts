import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/types/user.model';
import { findIndex } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: any = [];
  username!: any;
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        //console.log('dataUser', data);
        this.users = data.data.users;
        //console.log('datasUsers', this.users);
      },
      error: (e) => console.error(e),
    });
  }
  removeUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.username = data.data.user.username;
        console.log('userDataDelete', this.username);
        confirm('Etes vous sure de vouloir supprimer ' + this.username + '?')
          ? this.userService.deleteUser(id).subscribe(() => {
              console.log('user deleted sucessfully!');
            })
          : alert('suppression annulée!');
        this.reloadPage();
      },
    });
  }

  updateUserPage(id: number): void {
    this.router.navigate(['admin/user_detail', id]);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
