import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private guestService:GuestService, private router: Router) {}

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  login() {
    this.guestService.login(this.email, this.password).subscribe({
      next: (resp:any) => {
        this.router.navigate(["dashboard"]);
      },
      error: (error:any) => {
        this.errorMessage = error.error.message;
      }
    })
  }
}
