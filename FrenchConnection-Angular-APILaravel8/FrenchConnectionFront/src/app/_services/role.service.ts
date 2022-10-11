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
export class RoleService {
  constructor(private http: HttpClient) {}


  getUser(id: number): Observable<any> {
    let data = this.http.get(API_URL + `users/${id}`, httpOptions);
    // console.log('userInRoleService', data)
    return data;
  }

  getRolebyRoleId(role_id: number) {
    switch (role_id) {
      case 1:
        console.log('roleFromService', 'User');
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
