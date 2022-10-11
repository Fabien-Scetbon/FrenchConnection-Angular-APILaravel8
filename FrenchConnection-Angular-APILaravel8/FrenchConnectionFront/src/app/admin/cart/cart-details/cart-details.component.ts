import { Component, Input, OnInit } from '@angular/core';
import ICartData from '../../../types/cart.type';
import CartDataService from '../../../_services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentCart: ICartData = {
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

  message = '';
  userRole = '';

  constructor(
    private cartService: CartDataService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    // console.log('details oninit');
    if (!this.viewMode) {
      this.message = '';
      this.getCart(this.route.snapshot.params['id']);
    }
    this.userRole = this.tokenStorage.getUser().role;
  }

  async getCart(id: any): Promise<void> {
    // console.log('getcart');

    var result = await this.cartService.get(id);
    this.currentCart = result.data.cart;
    
  }

  deleteCart(id: number): void {

     if (window.confirm("Veuillez confirmer la suppression de ce panier.")) {
         this.cartService
           .delete(id)

           .subscribe({
             next: (res) => {
               this.router.navigate(['/admin/carts']);
             },
             error: (e) => console.error(e),
           });
       window.location.reload();
     }

  
  }
}
