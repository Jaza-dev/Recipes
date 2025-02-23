import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileModal') profileModal!: ElementRef;

  constructor(private userService:UserService, private router:Router) {}

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

  submitted:boolean = false;
  
  ngOnInit(): void  {
    // send request to fetch user data
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

  resetFields() {
    this.newPassword = "";
    this.repeatedNewPassword = "";
    this.oldPassword = "";
    this.showPassword = false;
    this.showRepeatedPassword = false;
    this.showOldPassword = false;
    this.errorMessage = "";
    this.submitted = false;
  }

  cancle() {
    this.name = this.fetchedName;
    this.successMessage = "";
    this.resetFields();
  }

  save() {

    // check if something is changed
    if(this.name === this.fetchedName && this.newPassword === "" && this.repeatedNewPassword === "") {
      this.errorMessage = "Nothing has been changed."
      return;
    } 

    // mark that Save is clicked
    this.submitted = true;

    // check if old password is inputed
    if(this.oldPassword === "") {
      this.errorMessage = "Please enter your old password.";
      this.successMessage = "";
      return;
    }

    // validate new password
    // if(this.newPassword && !this.isValidPassword(this.newPassword)){
    //   this.errorMessage = "New password is not in correct format."
    //   return;
    // }

    // check if newPassword and repeatedNewPassword are equal
    if(this.newPassword !== this.repeatedNewPassword) {
      this.errorMessage = "Password and repeated password must be the same."
      this.successMessage = "";
      return;
    }

    // send request to edit profile
    this.userService.editProfile(this.name, this.newPassword, this.oldPassword).subscribe({
      next:(resp:any) => {
        this.fetchedName = this.name;
        this.successMessage = resp.message;
        this.resetFields();
      },
      error:(error:any) => {
        this.errorMessage = error.error.message;
        this.successMessage = "";
        this.oldPassword = "";
      }
    });
  }

  delete(){
      // mark that delete is clicked
      this.submitted = true;

      if(this.oldPassword === "") {
        this.errorMessage = "Please enter your old password.";
        this.successMessage = "";
        return;
      }

      this.userService.deleteUser(this.oldPassword).subscribe({
        next: (resp:any) => {
          this.router.navigate([""], { queryParams: { message: "We are sorry to see you go." } }).then(() => {
            window.location.reload();
          });
        },
        error:(error:any) => {
          this.errorMessage = error.error.message;
          this.successMessage = "";
          this.oldPassword = "";
        }
      })
  }
}
