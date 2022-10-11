import { Component, OnInit } from '@angular/core';
import ICartData from '../../../types/cart.type'
import  CartDataService  from '../../../_services/cart.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css'],
})
export class AddCartComponent implements OnInit {
  cart: ICartData = {
    product_id: null,
    id: null,
    buyer_id: null,
    seller_id: null,
    amount: null,
    seller: null,
    buyer: null,
    productName: null,
    created_at:null,
  };
  submitted = false;

  constructor(private cartService: CartDataService) {}

  ngOnInit(): void {}

  saveCart(): void {
    const data = {
      buyer_id: this.cart.buyer_id,
      seller_id: this.cart.seller_id,
      amount: this.cart.amount,
      product_id: this.cart.product_id,
      seller: '',
      buyer: '',
      productName: '',
      created_at:'',
    };

    this.cartService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newCart(): void {
    this.submitted = false;
    this.cart = {
      product_id: null,
      id: null,
      buyer_id: null,
      seller_id: null,
      amount: null,
      seller: null,
      buyer: null,
      productName: null,
      created_at:null,
    };
  }
}