import { Component } from '@angular/core';
import { RecipeBookService } from '../services/recipe-book.service';
import { FormsModule } from '@angular/forms';
import { Toast } from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-book-creation',
  imports: [FormsModule, CommonModule],
  templateUrl: './recipe-book-creation.component.html',
  styleUrl: './recipe-book-creation.component.css'
})
export class RecipeBookCreationComponent  {

  constructor(private recipeBookService: RecipeBookService) {}

  name: string = "";
  description: string = "";
  color: string = "#ffffff";

  successMessage: string = "";
  errorMessage: string = "";

  resetValues() {
    this.name = "";
    this.description = "";
    this.color = "#ffffff";
  }

  cancle() {
    this.resetValues();
    this.errorMessage = "";
    this.successMessage = "";
  }

  create() {
    this.recipeBookService.create(this.name, this.description, this.color).subscribe({
      next: (resp: any) => {
        this.resetValues();
        this.errorMessage = "";
        this.successMessage = resp.message;
        this.showToast();
      },
      error: (error: any) => {
        this.resetValues();
        this.successMessage = "";
        this.errorMessage = error.error.message || "Failed to create recipe book.";
        this.showToast();
      }
    });
  }

  showToast() {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}
