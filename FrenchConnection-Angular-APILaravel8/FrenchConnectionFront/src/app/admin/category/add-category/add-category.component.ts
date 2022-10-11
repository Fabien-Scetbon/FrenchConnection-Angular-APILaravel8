import { Component, OnInit } from '@angular/core';
import ICategoryData from '../../../types/category.type'
import  CategoryDataService  from '../../../_services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {

  category: ICategoryData = {
    name: '',
    image: null,

  };
  submitted = false;
  selectedImage: File | null = null ;

  constructor(private categoryService: CategoryDataService) { }

  ngOnInit(): void {
  }

  onImageSelected(event:any) {
    this.selectedImage = <File>event.target.files[0];
  } 

  saveCategory(): void {
    const data = {
      name: this.category.name,
      image: this.selectedImage
           
    };

    this.categoryService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCategory(): void {
    this.submitted = false;
    this.category = {
      name: '',
      image: null,

    };
  }

}