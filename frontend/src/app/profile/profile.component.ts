import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileModal') profileModal!: ElementRef;

  constructor(private userService:UserService) {}

  name:string = "";
  fetchedName:string = "";
  email:string = "";
  newPassword:string = "";
  repeatedNewPassword:string = "";
  oldPassword:string = "";

  errorMessage:string = "";
  successMessage:string = "";

  showPassword = false;
  showRepeatedPassword = false;
  showOldPassword = false;
  
   ngOnInit(): void  {
    this.userService.getUserData().subscribe({
      next:(resp:any) => {
        this.name = this.fetchedName = resp.name;
        this.email = resp.email;
      },
      error:(error:any) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatedPassword() {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

  toggleOldPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  cancle() {
    this.name = this.fetchedName;
    this.newPassword = "";
    this.repeatedNewPassword = "";
    this.oldPassword = "";
    this.showPassword = false;
    this.showRepeatedPassword = false;
    this.showOldPassword = false;
    this.errorMessage = "";
    this.successMessage = "";
  }

  save() {
    if(this.name === this.fetchedName && this.newPassword === "" && this.repeatedNewPassword === "") return;
    if(this.oldPassword === "") {
      this.errorMessage = "Please enter your old password.";
      this.successMessage = "";
      return;
    }
    // if(!this.isValidPassword(this.password)){
    //   this.errorMessage = "Password is not in correct format."
    //   return;
    // }
    if(this.newPassword !== this.repeatedNewPassword) {
      this.errorMessage = "Password and repeated password must be the same."
      this.successMessage = "";
      return;
    }
    this.userService.editProfile(this.name, this.newPassword, this.oldPassword).subscribe({
      next:(resp:any) => {
        this.fetchedName = this.name;
        this.errorMessage = "";
        this.newPassword = "";
        this.repeatedNewPassword = "";
        this.oldPassword = "";
        this.successMessage = resp.message;
      },
      error:(error:any) => {
        this.errorMessage = error.error.message;
      }
    });
  }
}
