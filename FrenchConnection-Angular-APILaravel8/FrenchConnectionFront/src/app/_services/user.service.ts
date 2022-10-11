import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user.model';

const API_URL = 'http://localhost:8000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    let data = this.http.get(API_URL + 'users', httpOptions);
    return data;
  }

  getUser(id: number): Observable<any> {
    let data = this.http.get(API_URL + `users/${id}`, httpOptions);
    return data;
  }

  deleteUser(id: number) {
    return this.http.delete<void>(API_URL + `users/${id}`, httpOptions);
  }

  update(id: number, user: User): Observable<any> {
    return this.http.patch(
      API_URL + `users/${id}`,
      JSON.stringify(user),
      httpOptions
    );
  }

  create(user: User): Observable<any> {
    return this.http.post<User>(API_URL + 'register', httpOptions);
  }

  getRolebyRoleId(role_id: number) {
    switch (role_id) {
      case 1:
        // console.log("roleFromService", 'User');
        return 'User';
        break;
      case 2:
        return 'Seller';
        console.log('Seller');
        break;
      case 3:
        return 'Buyer';
        console.log('Buyer');
        break;
      case 4:
        return 'Admin';
        console.log('Admin');
        break;

      default:
        console.log('it should be a number between 1-4 !');
        return 'Role_id = number between 1-4 !';

        break;
    }
  }
}
