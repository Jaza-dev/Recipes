import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path:"register", component:RegisterComponent },
    { path:"", component:LoginComponent},
    { path:"dashboard", component:DashboardComponent, canActivate: [AuthGuard] },
    { path:"profile", component:ProfileComponent, canActivate: [AuthGuard] }
];
