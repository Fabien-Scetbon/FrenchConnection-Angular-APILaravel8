import { Component, Input, OnInit } from '@angular/core';
import IProductData from '../../../types/product.type'
import  ProductDataService  from '../../../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: IProductData = {
    id: null,
    name: '',
    description: '',
    price: 0,
    image: null,
    seller_id: 1,
    category_id: 1,
    //category:'',
    status: false 
  };
  
  message = '';
  productName= '';

  constructor(
    private productService: ProductDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }


  async getProduct(id: string): Promise<any> {
    var result = await this.productService.get(id)
    this.currentProduct = result.data.product
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentProduct.name,
      description:this.currentProduct.description,
      price:this.currentProduct.price,
      image:this.currentProduct.image,
      seller_id:this.currentProduct.seller_id,
      category_id:this.currentProduct.category_id,
      status:this.currentProduct.status 


    };

    this.message = '';

    this.productService.update(this.route.snapshot.params["id"], data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';

    this.productService.update(this.route.snapshot.params["id"], this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.message = res.message ? res.message : 'This product was updated successfully!';
          this.router.navigate(['/']);
        },
        error: (e) => console.error(e)
      });
  }

  // deleteProduct(): void {
    // this.productService.delete(this.route.snapshot.params["id"])
      // .subscribe({
        // next: (res) => {
          // console.log(res);
          // this.router.navigate(['/']);
        // },
        // error: (e) => console.error(e)
      // });
  // }


  deleteProduct(): void {
    this.productService.getProduct(this.route.snapshot.params["id"])
      .subscribe({
        next: (res) => {
          console.log(res);
          this.productName = res.data.product.name;
          confirm('Etes vous sure de vouloir supprimer ' + this.productName + '?')
          ? this.productService.delete(this.route.snapshot.params["id"]).subscribe(() => {
            console.log('product deleted sucessfully!');
            this.router.navigate(['/']);
          })
        : alert('suppression annulée!');
        
        },
        error: (e) => console.error(e)
      });
  }

  // removeUser(id: number): void {
    // this.userService.getUser(id).subscribe({
      // next: (data) => {
        // this.username = data.data.user.username;
        // console.log('userDataDelete', this.username);
        // confirm('Etes vous sure de vouloir supprimer ' + this.username + '?')
          // ? this.userService.deleteUser(id).subscribe(() => {
              // console.log('user deleted sucessfully!');
            // })
          // : alert('suppression annulée!');
        // this.reloadPage();
      // },
    // });
  // }

}