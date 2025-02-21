import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../services/guest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private guestService:GuestService, private router: Router, private route:ActivatedRoute) {}

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
        next: params => {
          this.errorMessage = params.get('message') as string;
        }
      }
    )
  }

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
