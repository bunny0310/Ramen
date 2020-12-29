import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginFormStatus: boolean;

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getUserData() {
      return JSON.parse(localStorage.getItem('user-ramen'));
  }

  public isAuthenticated() {
      const obj = localStorage.getItem('user-ramen') === null ? null : JSON.parse(localStorage.getItem('user-ramen'));
      if (obj == null) {
          this.router.navigate(['login']);
          return false;
      }
      return true;
  }

  public loggedIn() {
      return localStorage.getItem('user-ramen') !== null;
  }
}
