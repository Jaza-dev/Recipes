import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path:"register", component:RegisterComponent },
    { path:"", component:LoginComponent},
    { path:"dashboard", component:DashboardComponent}
];
