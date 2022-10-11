import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../types/tutorial.model';

const baseUrl = 'http://localhost:8000/api/products';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

}
