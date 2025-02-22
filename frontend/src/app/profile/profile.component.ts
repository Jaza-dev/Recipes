import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService) {}

  name:string = "";
  email:string = "";

  errorMessage:string = "";

  showPassword = false;
  showRepeatedPassword = false;
  
   ngOnInit(): void  {
    this.userService.getUserData().subscribe({
      next:(resp:any) => {
        this.name = resp.name;
        this.email = resp.email;
      },
      error:(error:any) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatedPassword() {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }
}
