import { Component, OnInit } from '@angular/core';
import ICartData from '../../../types/cart.type';
import CartDataService from '../../../_services/cart.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-carts-list',
  templateUrl: './carts-list.component.html',
  styleUrls: ['./carts-list.component.css'],
})
export class CartsListComponent implements OnInit {
  carts?: any;

  currentCart: ICartData = {
    product_id: null,
    id: null,
    buyer_id: null,
    seller_id: null,
    amount: null,
    seller: null,
    buyer: null,
    productName: null,
    created_at: null,
  };
  currentIndex = -1;
  id = 0;
  productName = '';
  userId = '';
  userRole = '';
  nbProducts = 0;
  total = 0;
  userName = '';

  constructor(
    private cartService: CartDataService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    // console.log(this.tokenStorage.getUser());
    this.userId = this.tokenStorage.getUser().user_id;
    this.userRole = this.tokenStorage.getUser().role;
    console.log(this.userRole);
    this.retrieveCarts();

    // console.log(this.userId);
  }

  async retrieveCarts(): Promise<any> {
    var result = await this.cartService.getAll();
    if (this.userRole == 'Admin') {
      this.carts = result.data.carts;
      this.nbProducts = this.carts.length;
    } else {
      const userArray = [];

      this.carts = result.data.carts;
      this.nbProducts = this.carts.length;
      // console.log(this.nbProducts);

      for (const cart in this.carts) {
        // console.log(this.carts[cart]);
        if (this.carts[cart].buyer_id == this.userId) {
          // console.log('oui');
          userArray.push(this.carts[cart]);
          this.total += this.carts[cart].amount;
        }
      }
      this.carts = userArray;
      this.nbProducts = this.carts.length;
      // console.log(this.nbProducts);
    }
  }

  setActiveCart(cart: ICartData, index: number): void {
    this.currentCart = cart;
    // console.log(cart);
    this.currentIndex = index;
    // this.productName = cart.productName;
    //  console.log(this.productName);
  }

  // searchUserName(): void {
  //   this.currentCart = {
  //     id : null,
  //     buyer_id : null,
  //     product_id : null,
  //     amount: null,
  //     seller_id: null,
  //     seller: null,
  //     buyer: null,
  //     productName: null,
  //     created_at:null,
  //   };
  //   this.currentIndex = -1;

  //   this.cartService.findByUserName(this.userName)
  //     .subscribe({
  //       next: (data) => {
  //         this.carts = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}
