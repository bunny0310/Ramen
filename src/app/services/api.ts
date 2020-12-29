import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject, throwError } from 'rxjs';
import { AuthService } from './auth';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  professionals: [] = [];
  distinctCompanies: [] = [];
  distinctJobTitles: [] = [];
  templates: [] = [];
  savedProfessionals: [] = [];


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }
  professionalsUpdated = new Subject<{data: []}>();
  companiesUpdated = new Subject<{data: []}>();
  jobTitlesUpdated = new Subject<{data: []}>();
  companyProfsUpdated = new Subject<{data: []}>();
  jobTitleProfsUpdated = new Subject<{data: []}>();
  templatesUpdated = new Subject<{data: []}>();
  savedProfessionalsUpdated = new Subject<{data: []}>();

  public getProfessionals() {
    this.http.get<[]>('https://ramen-professionals-service.herokuapp.com/api/v1/professionals')
      .subscribe((res: any) => {
        this.professionals = res;
        this.professionalsUpdated.next({data: res});
      });
  }

  public getProfessionalsUpdateListener() {
    return this.professionalsUpdated.asObservable();
  }

  public getDistinctCompanies() {
    this.http.get<[]>('https://ramen-professionals-service.herokuapp.com/api/v1/professionals/companies')
      .subscribe((res: any) => {
        this.distinctCompanies = res;
        this.companiesUpdated.next({data: res});
      });
  }

  public getDistinctCompaniesUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  public getDistinctJobTitles() {
    this.http.get<[]>('https://ramen-professionals-service.herokuapp.com/api/v1/professionals/jobTitles')
      .subscribe((res: any) => {
        this.distinctJobTitles = res;
        this.jobTitlesUpdated.next({data: res});
      });
  }

  public getDistinctJobTitlesUpdateListener() {
    return this.jobTitlesUpdated.asObservable();
  }

  public getCompanyProfs(name: string) {
    if (name === '') {
      return;
    }
    this.http.get<[]>('https://ramen-professionals-service.herokuapp.com/api/v1/professionals/companies/' + name)
      .subscribe((res: any) => {
        this.professionals = res;
        this.companyProfsUpdated.next({data: res});
      });
  }

  public getCompanyProfsUpdateListener() {
    return this.companyProfsUpdated.asObservable();
  }

  public getJobTitleProfs(name: string) {
    if (name === '') {
      return;
    }
    this.http.get<[]>('https://ramen-professionals-service.herokuapp.com/api/v1/professionals/jobTitles/' + name)
      .subscribe((res: any) => {
        this.professionals = res;
        this.jobTitleProfsUpdated.next({data: res});
      });
  }

  public getJobTitleProfsUpdateListener() {
    return this.jobTitleProfsUpdated.asObservable();
  }

  public getUserTemplates() {
    const userObj: any = this.authService.getUserData();
    if (userObj === null) {
      return;
    }
    this.http.get<[]>('https://ramen-templates-service.herokuapp.com/api/v1/templates/list/' + userObj.user.id)
      .subscribe((res: any) => {
        this.templates = res;
        this.templatesUpdated.next({data: res});
      });
  }

  public getUserTemplatesUpdateListener() {
    return this.templatesUpdated.asObservable();
  }

  public getSavedProfessionals() {
    const userObj: any = this.authService.getUserData();
    if (userObj === null) {
      return;
    }
    this.http.get<[]>('https://ramen-saved-profs-service.herokuapp.com/api/v1/savedProfessionals/list/' + userObj.user.id)
      .subscribe((res: any) => {
        this.savedProfessionals = res;
        this.savedProfessionalsUpdated.next({data: res});
      });
  }

  public getSavedProfessionalsUpdateListener() {
    return this.savedProfessionalsUpdated.asObservable();
  }

  public insertSavedProfessionals(savedProfessionals) {
    this.http.post('https://ramen-saved-profs-service.herokuapp.com/api/v1/savedProfessionals/insert', savedProfessionals,
    {observe: 'response', responseType: 'text'})
    .pipe(
      catchError(this.handleError.bind(this))
    )
    .subscribe((response) => {
    });
    return 1;
  }

  public updateSP(data, template, email) {
    this.http.post('https://ramen-saved-profs-service.herokuapp.com/api/v1/savedProfessionals/update', data,
    {observe: 'response'})
    .pipe(
      catchError(this.handleError.bind(this))
    )
    .subscribe((response) => {
      window.location.href = 'mailto:' + email + '?subject=' + 'Ramen reaching out' + '&body=' + template.template;
    });
  }


private handleError(error: HttpErrorResponse) {

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
  // Return an observable with a user-facing error message.
  if (error.status === 401) {
    this.router.navigate(['/login']);
  }
  console.log(error);
  return throwError('Error!');
}
}

