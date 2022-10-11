import { Component, OnInit } from '@angular/core';
import IProductData from '../../../types/product.type'
import ICategoryData from 'src/app/types/category.type';
import  ProductDataService  from '../../../_services/product.service';
import CategoryDataService from 'src/app/_services/category.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  product: IProductData = {
    name: '',
    description: '',
    price: 0,
    seller_id: 1,
    category_id: 0,
    status: false,
    image: null
  };
  categories: ICategoryData[] = []
  submitted = false;
  selectedImage: File | null = null ;
  user?: any;


  constructor(private tokenService: TokenStorageService, private productService: ProductDataService, private categoryService: CategoryDataService) { }

  ngOnInit(): void {
    this.retrieveCategories();
    this.getUserinfo();
  }


  async retrieveCategories(): Promise<any> {
    var result = await this.categoryService.getAll();
   
    this.categories= result.data.categories
    console.log(this.categories);
  }

  
  onImageSelected(event:any) {
    this.selectedImage = <File>event.target.files[0];
  } 

  saveProduct(): void {
    const data = {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      image: this.selectedImage,  
      seller_id: this.user.user_id,             
      category_id: this.product.category_id,       
      status: false
                
    };
    console.log(this.selectedImage);
    

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  async getUserinfo(): Promise<any>{
    let result = await this.tokenService.getUser()    
    this.user = result;
    console.log(this.user.user_id);
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      description: '',
      price: 0,
      image: null,
      seller_id: 1,
      category_id: 1,
      status: true 
    };
  }

}