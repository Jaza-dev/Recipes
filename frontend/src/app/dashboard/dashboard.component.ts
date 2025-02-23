import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { ProfileComponent } from '../profile/profile.component';
import { RecipeBookCreationComponent } from '../recipe-book-creation/recipe-book-creation.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, ProfileComponent, RecipeBookCreationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
}
