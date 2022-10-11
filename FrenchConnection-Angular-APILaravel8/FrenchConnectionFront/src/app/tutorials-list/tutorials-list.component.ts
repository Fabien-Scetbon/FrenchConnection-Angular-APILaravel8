import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/types/tutorial.model';
import { User } from '../types/user.model';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { RoleService } from '../_services/role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials: Tutorial[] = [];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  name = '';
  admin = 'false';
  userId = 0;
  user: any = [];
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  isLoggedIn = false;
 

  constructor(
    private tutorialService: TutorialService,
    private roleService: RoleService,
    private tokenService: TokenStorageService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.userId = this.tokenService.getUserId();
      this.currentUserIsAdmin(this.userId);
    }
    this.retrieveTutorials();
  }

  currentUserIsAdmin(id: number) {
    this.roleService.getUser(id).subscribe({
      next: (data) => {
        this.user = data.data.user;
        if (this.user.role == 'Admin') {
          this.admin = 'true';
        }
      },
      error: (e) => console.error(e),
    });
  }

  updateProductPage(id: number): void {
    this.router.navigate(['admin/products', id]);
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`name`] = searchName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }
    // console.log(params);
    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.tutorialService.getAll(params).subscribe({
      next: (data) => {
        const tutorials = data.data.products;
        this.tutorials = tutorials;
        this.count = this.tutorials.length;
        console.log(this.tutorials);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  searchName(): void {
    this.page = 1;

    const params = this.getRequestParams(this.name, this.page, this.pageSize);

    this.tutorialService.getAll(params).subscribe({
      next: (data) => {
        const tutorials = data.data.products;
        // console.log(tutorials);
        // console.log(typeof(tutorials));
        // console.log(this.name);
        const searchArray = [];
        for (const prop in tutorials) {
          // console.log(tutorials[prop].name);

          if (
            tutorials[prop].name.toUpperCase().includes(this.name.toUpperCase())
          ) {
            // console.log('oui');
            searchArray.push(tutorials[prop]);
          }
        }
        this.tutorials = searchArray;
        this.count = this.tutorials.length;
        //console.log('search',this.tutorials);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
