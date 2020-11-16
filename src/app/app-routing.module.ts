import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/authGuard';
import { AppComponent } from './app.component';
import { LoggedInGuardService } from './guards/loggedInGuard';
import { HomeComponent } from './home/home.component';
import { TemplatesComponent } from './templates/templates.component';
import { OutreachComponent } from './outreach/outreach.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoggedInGuardService]},
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'templates', component: TemplatesComponent, canActivate: [AuthGuardService]},
  {path: 'outreach', component: OutreachComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
