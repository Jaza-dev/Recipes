import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private userService:UserService, private router:Router) {}
  
  logout() {
    this.userService.logout().subscribe().add(() => {
      this.router.navigate([""]);
    });
  }
}
