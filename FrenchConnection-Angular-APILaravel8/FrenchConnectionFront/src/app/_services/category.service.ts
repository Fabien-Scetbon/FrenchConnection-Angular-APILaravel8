import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import ICategoryData from '../types/category.type';

const API_URL = "http://localhost:8000/api";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  @Injectable({
    providedIn: 'root'
  })
  
export default class CategoryDataService {
    constructor(private http: HttpClient) { }
    
  getAll() {
    return this.http.get<Promise<any>>(API_URL + "/categories",httpOptions).toPromise();
  }

  get(id: string ) {
    return this.http.get<Promise<any>>(API_URL + `/categories/${id}`,httpOptions).toPromise();
  }


  create(data:ICategoryData){
    var formData: any = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    return this.http.post<Promise<any>>(API_URL + "/categories", formData);
  }


  update(id: number , data:ICategoryData) {
    return this.http.patch<any>(API_URL + `/categories/${id}`, data,httpOptions);
  }

  delete(id: number ) {
    return this.http.delete<any>(API_URL + `/categories/${id}`,httpOptions);
  }

  deleteAll() {
    return this.http.delete<any>(API_URL + `/categories`,httpOptions);
  }

  findByName(name:string) {
    return this.http.get<Promise<any>>(API_URL + `/categories?name=${name}`,httpOptions).toPromise();
  }
}
