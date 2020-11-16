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
      return localStorage.getItem('user');
  }

  public isAuthenticated() {
      const obj = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
      if (obj == null) {
          this.router.navigate(['login']);
          return false;
      }
      this.httpClient.get<{success: number}>('http://35.185.118.209:8080/api/v1/auth/isAuthorized/' + obj.hash)
      .subscribe((response) => {
        console.log(response);
        if (response.success === 1) {
            console.log('inside if');
            return true;
        }
        return false;
      });
      return true;
  }

  public loggedIn() {
      return localStorage.getItem('user') !== null;
  }
}
