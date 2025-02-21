import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GuestService } from '../services/guest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private guestService:GuestService, private router:Router) {}
  
  canActivate(): Observable<boolean> {
    return this.guestService.isAuthenticated().pipe(
      map(response => {
        return true;
      }), 
      catchError(error => {
        this.router.navigate([""], { queryParams: { message: "Please login first." } });
        return of(false);
      })
    );
  }

}
