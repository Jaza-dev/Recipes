import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri:string = 'http://localhost:4000/user';

  constructor(private http:HttpClient) { }

  getUserData() {
    return this.http.post<Object>(`${this.uri}/getUserData`, {}, { withCredentials: true });
  }

  logout() {
    return this.http.post<String>(`${this.uri}/logout`, {}, { withCredentials: true });
  }

  editProfile(name:string, newPassword:string, oldPassword:string) {

    const data = {
      name, 
      newPassword,
      oldPassword
    };

    return this.http.patch<String>(`${this.uri}/editProfile`, data, { withCredentials: true });
  }
}
