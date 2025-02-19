import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http:HttpClient) { }

  uri:string = 'http://localhost:4000/guest';

  isAuthenticated() {
    return this.http.post<{ authenticated:boolean }>(`${this.uri}/isAuthenticated`, {}, { withCredentials: true });
  }

  register(name:String, email:String, password:String) {
    
    const data = {
      name,
      email,
      password
    }

    return this.http.post<String>(`${this.uri}/register`, data);
  }

  login(email:string, password:String) {

    const data = {
      email,
      password
    }

    return this.http.post<String>(`${this.uri}/login`, data, { withCredentials: true });

  }

}
