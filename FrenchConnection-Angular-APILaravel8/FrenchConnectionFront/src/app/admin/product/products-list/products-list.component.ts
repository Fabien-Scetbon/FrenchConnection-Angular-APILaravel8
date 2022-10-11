import { Component, OnInit } from '@angular/core';
import IProductData from '../../../types/product.type'
import  ProductDataService  from '../../../_services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: any 
  currentProduct: IProductData = {};
  currentIndex = -1;
  name = '';

  constructor(private productService: ProductDataService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  async retrieveProducts(): Promise<any> {
    var result = await this.productService.getAll();
   
    this.products= result.data.products
    console.log(this.products);
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: IProductData, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
    console.log(this.currentProduct.id);
    
  }

  removeAllProducts(): void {
    this.productService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  async searchName(): Promise<any> {
    this.currentProduct = {};
    this.currentIndex = -1;

    var result = await this.productService.findByName(this.name);
    this.products= result.data.products
  }

}