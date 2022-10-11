import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.model';

const AUTH_API = 'http://localhost:8000/api/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }
  
      
  register(user: User): Observable<any> {
    console.log("userDataService", user)
    return this.http.post(AUTH_API + 'register', user, httpOptions);
  }
}