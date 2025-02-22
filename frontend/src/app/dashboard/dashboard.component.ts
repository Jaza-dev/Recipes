import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, ProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
