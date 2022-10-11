import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import ProductDataService from '../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import CartDataService from '../_services/cart.service';
import { TokenStorageService } from '../_services/token-storage.service';
import IProductData from '../types/product.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  errorMessage = '';
  isInCart = false;
  content?: string;
  id?: string;
  user?: any;
  product: IProductData = {};
  productSold = false;
  status?: boolean;
  category?: string;
  seller?: string;

  constructor(
    private tokenService: TokenStorageService,
    // private userService: UserService,
    private route: ActivatedRoute,
    private productService: ProductDataService,
    private cartDataService: CartDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['id']);
    this.getUserinfo();
    console.log(this.isInCart);
  }

  async getProduct(id: string): Promise<any> {
    if (id) {
      var result = await this.productService.get(id);
      this.product = result.data.product;
      this.status = this.product.status;
      this.seller = this.product.seller;
      this.productSold = this.status == true ? true : false;

      console.log(this.productSold);
    }
  }

  async getUserinfo(): Promise<any> {
    let result = await this.tokenService.getUser();
    this.user = result;
    // console.log(this.user.username);
    // console.log(Object.keys(this.user));
  }

  addToCart() {
    if (Object.keys(this.user).length !== 0) {
      // console.log("loggé");
      let data = {
        buyer_id: this.user.user_id,
        product_id: this.product.id,
        seller_id: this.product.seller_id,
        amount: this.product.price,
        seller: '',
        buyer: '',
        productName: '',
        created_at: '',
      };
      this.cartDataService.create(data).subscribe({
        next: (data: any) => {
          console.log(data.status);
          if (data.status === 200) {
            this.isInCart = true;
            this.updatePublished();
          } else if (data.status === 202) this.isInCart = false;
          // console.log(this.isInCart);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    } else {
      //console.log('PAS loggé');

      this.router.navigate(['login']);
    }
  }

  updatePublished(): void {
    const data = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      image: this.product.image,
      seller_id: this.product.seller_id,
      category_id: this.product.category_id,
      status: true,
    };

    this.productService
      .update(this.route.snapshot.params['id'], data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e),
      });
  }
}
