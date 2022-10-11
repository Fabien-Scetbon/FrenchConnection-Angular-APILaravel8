import { Component, Input, OnInit } from '@angular/core';
import ICategoryData from '../../../types/category.type'
import  CategoryDataService  from '../../../_services/category.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCategory: ICategoryData = {
    id: null,
    name: '',
    image: null,

  };
  
  message = '';

  constructor(
    private categoryService: CategoryDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCategory(this.route.snapshot.params["id"]);
    }
  }

  async getCategory(id: string): Promise<any> {
    var result = await this.categoryService.get(id)
    this.currentCategory = result.data.category
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentCategory.name,
      image:this.currentCategory.image,



    };

    this.message = '';

    this.categoryService.update(this.route.snapshot.params["id"], data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateCategory(): void {
    this.message = '';

    this.categoryService.update(this.route.snapshot.params["id"], this.currentCategory)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This category was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteCategory(): void {
    this.categoryService.delete(this.route.snapshot.params["id"])
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/admin/categories']);
        },
        error: (e) => console.error(e)
      });
  }

}