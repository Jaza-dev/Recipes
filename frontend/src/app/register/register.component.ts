import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private guestService:GuestService, private router:Router){}

  name: string = '';
  email: string = '';
  password: string = '';
  repeatedPassword: string = '';

  errorMessage: string = '';

  showNextStep: boolean = false;

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  proceedToNextStep() {
    if (this.name.trim() !== '') {
      this.showNextStep = true;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter your name first!';
    }
  }

  register() {
    // if(!this.isValidPassword(this.password)){
    //   this.errorMessage = "Password is not in correct format."
    //   return;
    // }
    if(!this.isValidEmail(this.email)){
      this.errorMessage = "E-mail is not in correct format."
      return;
    }
    if(this.password !== this.repeatedPassword) {
      this.errorMessage = "Password and repeated password need to be same."
      return;
    }
    this.guestService.register(this.name, this.email, this.password).subscribe(
      {
        next: (resp:any) => {
          if(resp.message === "User registered successfully."){
            this.router.navigate([""]);
          }
        },
        error: (error:any)=>{
          this.errorMessage = error.error.message;
        }
      }
    )
  }

  goBack() {
    this.showNextStep = false;
    this.errorMessage = '';
  }
}
