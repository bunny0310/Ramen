import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { GlobalVariablesService } from '../global-variables.service';
import { throwError } from 'rxjs';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  templateForm = new FormGroup({
    alias: new FormControl('', [Validators.required]),
    template: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  constructor(
    private httpClient: HttpClient,
    public globalVariablesService: GlobalVariablesService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PopupComponent>) { }

  ngOnInit() {
    this.globalVariablesService.setTemplateFormStatus(true);
  }

  onSubmit() {
    const userObj = localStorage.getItem('user-ramen');
    if (userObj === null) {
      this.dialogRef.close(false);
      return;
    }
    const formData = {
      userId: JSON.parse(userObj).user.id,
      alias: this.templateForm.get('alias').value,
      template: this.templateForm.get('template').value
    };
    console.log(formData);
    this.httpClient.post('http://ramen-templates-service.herokuapp.com/api/v1/templates/insert', formData, {observe: 'response', responseType: 'text'})
    .pipe(
      catchError(this.handleError.bind(this))
    )
    .subscribe((response) => {
      // if (error.status === 401) {
      //   this.invalidLogin = true;
      // }
      console.log('reaching here!' + response);
      this.dialogRef.close(true);
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error ', error);
    if (error.status !== 200) {
      this.dialogRef.close(false);
    }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
    // Return an observable with a user-facing error message.
    return throwError('Error!');
  }

}
