import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth';
@Injectable({
    providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
