import { Component, OnInit, Input } from '@angular/core';
import ICategoryData from 'src/app/types/category.type';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.css']
})
export class CategoryButtonComponent implements OnInit {

  @Input() category: ICategoryData = {
    id: null,
    name: '',
    image: null,

  };
  constructor() { }

  ngOnInit(): void {
  }

  

}

