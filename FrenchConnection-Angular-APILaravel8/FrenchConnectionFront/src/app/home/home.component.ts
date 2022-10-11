import { Component, OnInit } from '@angular/core';
import CategoryDataService from '../_services/category.service';
import ICategoryData from '../types/category.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  categories?: ICategoryData[];

  constructor(
    private categoryService: CategoryDataService
  ) {}

  ngOnInit(): void {

    this.retrieveCategories();
  }

  async retrieveCategories(): Promise<any> {
    var result = await this.categoryService.getAll();

    this.categories = result.data.categories;
    // console.log(this.categories);
  }
}
