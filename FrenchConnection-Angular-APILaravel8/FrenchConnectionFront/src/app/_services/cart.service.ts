import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ICartData from '../types/cart.type';

const API_URL = "http://localhost:8000/api";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
export default class CartDataService {
    constructor(private http: HttpClient) { }
    
  getAll() {
    return this.http.get<Promise<any>>(API_URL + "/carts",httpOptions).toPromise();
  }
  

  get(id: any ) {
    return this.http.get<Promise<any>>(API_URL + `/carts/${id}`,httpOptions).toPromise();
  }
  getCartsByBuyer(buyer_id: any ) {
    return this.http.get<Promise<any>>(API_URL + `/carts/${buyer_id}`,httpOptions).toPromise();
  }

  create(data:ICartData){
    return this.http.post<ICartData>(API_URL + "/carts", data,httpOptions);
  }

  delete(id: number ) {
    return this.http.delete<any>(API_URL + `/carts/${id}`,httpOptions);
  }

  

  findById(id:any) {
    return this.http.get<Array<ICartData>>(API_URL + `/carts?id=${id}`,httpOptions);
  }

}
