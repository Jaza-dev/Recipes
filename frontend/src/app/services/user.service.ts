import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri:string = 'http://localhost:4000/user';

  constructor(private http:HttpClient) { }

  logout() {
    return this.http.post<String>(`${this.uri}/logout`, null);
  }
}
