import { Component, OnInit } from '@angular/core';
import ICategoryData from '../../../types/category.type'
import  CategoryDataService  from '../../../_services/category.service';


@Component({
  selector: 'app-Categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories?: ICategoryData[];
  currentCategory: ICategoryData = {
    name: '',
    image: null
  };
  
  currentIndex = -1;
  name = '';

  constructor(private categoryService: CategoryDataService) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  async retrieveCategories(): Promise<any> {
    var result = await this.categoryService.getAll();
   
    this.categories= result.data.categories
    console.log(this.categories);
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentCategory = {
      name: '',
      image: null
    };
    this.currentIndex = -1;
  }

  setActiveCategory(category: ICategoryData, index: number): void {
    this.currentCategory = category;
    this.currentIndex = index;
  }

  remove(id: number): void {
    this.categoryService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }


  async searchName(): Promise<any> {
    this.currentCategory = {
      name: '',
    image: null
    };
    this.currentIndex = -1;

    var result = await this.categoryService.findByName(this.name);
    this.categories= result.data.categories
  }

}