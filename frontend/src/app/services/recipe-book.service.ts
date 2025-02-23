import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeBookService {

  uri:string = "http://localhost:4000/recipeBook";

  constructor(private http:HttpClient) { }

  create(name:string, description:string, color:string) {

    const data = {
      name,
      description,
      color
    }
 
    return this.http.post<String>(`${this.uri}/create`, data, { withCredentials: true });
  }

}
