import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IProductData from '../types/product.type';
import { Observable } from 'rxjs';


const API_URL = "http://localhost:8000/api";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
const httpCreateOption = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
}
  
  @Injectable({
    providedIn: 'root'
  })
  
export default class ProductDataService {
    constructor(private http: HttpClient) { }
    
  getAll() {
    return this.http.get<Promise<any>>(API_URL + "/products",httpOptions).toPromise();
  }

  get(id: string ) {
    return this.http.get<Promise<any>>(API_URL + `/products/${id}`,httpOptions).toPromise();
  }

  //to do : merge [get + getProduct] (jean)

  getProduct(id: number): Observable<any> {
    let data = this.http.get(API_URL + `/products/${id}`, httpOptions);
    return data;
  }

  getbyCategory(id: string ) {
    return this.http.get<Promise<any>>(API_URL + `/products/category/${id}`,httpOptions).toPromise();
  }


  create(data:IProductData){
    var formData: any = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("seller_id", data.seller_id);
    formData.append("category_id", data.category_id);
    formData.append("image", data.image);
    return this.http.post<Promise<any>>(API_URL + "/products", formData);
  }


  // update(id: number , data:IProductData): Observable<any>  {
    // return this.http.patch(API_URL + `/products/${id}`, JSON.stringify(data),httpOptions);
  // }
  update(id: number, data: IProductData): Observable<any> {
    // var product: any = {};
    // product["name"] = data.name;
    // product["price"] = data.price;
    // product["description"] = data.description;
    // product["seller_id"] = data.seller_id;
    // product["category_id"] = data.category_id;
    // product["image"] = data.image;

    console.log("data", JSON.stringify(data))
    // console.log("product", product)

    return this.http.patch(
      API_URL + `/products/${id}`,
      JSON.stringify(data),
      httpOptions
    );
  }

  delete(id: number ) {
    return this.http.delete<any>(API_URL + `/products/${id}`,httpOptions);
  }

  deleteAll() {
    return this.http.delete<any>(API_URL + `/products`,httpOptions);
  }

  findByName(name:string) {
    return this.http.get<Promise<any>>(API_URL + `/products?name=${name}`,httpOptions).toPromise();
  }
}