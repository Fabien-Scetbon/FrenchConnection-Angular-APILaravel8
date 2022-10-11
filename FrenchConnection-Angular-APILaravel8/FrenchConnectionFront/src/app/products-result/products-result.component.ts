import { Component, OnInit } from '@angular/core';
import ProductDataService from '../_services/product.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-products-result',
  templateUrl: './products-result.component.html',
  styleUrls: ['./products-result.component.css']
})
export class ProductsResultComponent implements OnInit {
  products: any 
  constructor(private productService: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  async retrieveProducts(): Promise<any> {
     this.route.params.subscribe( async (params) => {
      if (this.route.snapshot.queryParams['category']) {
      var result = await this.productService.getbyCategory(this.route.snapshot.queryParams['category'])
      
      // console.log(result.data['products'])
      this.products = result.data['products']
      // console.log(this.products)
      }
      
      
    })
  }
}