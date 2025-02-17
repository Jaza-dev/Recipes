import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http:HttpClient) { }

  uri:string = 'http://localhost:4000/guest';

  register(name:String, email:String, password:String) {
    
    const data = {
      name:name,
      email:email,
      password:password
    }

    return this.http.post<String>(`${this.uri}/register`, data);
  }

}
