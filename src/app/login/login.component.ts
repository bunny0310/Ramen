import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariablesService } from '../global-variables.service';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(
    private httpClient: HttpClient, public globalVariablesService: GlobalVariablesService,
    private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.globalVariablesService.setLoginFormStatus(true);
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    this.loading = true;
    const formData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.httpClient.post('https://ramen-authorization-service.herokuapp.com/api/v1/auth/login', formData, {observe: 'response'})
    .pipe(
      catchError(this.handleError.bind(this))
    )
    .subscribe((response) => {
      // if (error.status === 401) {
      //   this.invalidLogin = true;
      // }
      this.globalVariablesService.setLoginFormStatus(true);
      const userData = {
        user: JSON.parse(response.body.user),
        hash: response.body.hash
      };
      localStorage.setItem('user-ramen', JSON.stringify(userData));
      this.loading = false;
      this.router.navigate(['/']);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.snackBar.open('Invalid login credentials', '', {
        duration: 2000
      });
      this.loading = false;
    }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
    // Return an observable with a user-facing error message.
    return throwError('Error!');
  }
}
