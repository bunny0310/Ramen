import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  professionals: [] = [];
  distinctCompanies: [] = [];
  distinctJobTitles: [] = [];
  templates: [] = [];
  savedProfessionals: [] = [];


  constructor(private http: HttpClient, private authService: AuthService) { }
  professionalsUpdated = new Subject<{data: []}>();
  companiesUpdated = new Subject<{data: []}>();
  jobTitlesUpdated = new Subject<{data: []}>();
  companyProfsUpdated = new Subject<{data: []}>();
  jobTitleProfsUpdated = new Subject<{data: []}>();
  templatesUpdated = new Subject<{data: []}>();
  savedProfessionalsUpdated = new Subject<{data: []}>();

  public getProfessionals() {
    this.http.get<[]>('http://35.229.84.111:8080/api/v1/professionals')
      .subscribe((res: any) => {
        this.professionals = res;
        this.professionalsUpdated.next({data: res});
      });
  }

  public getProfessionalsUpdateListener() {
    return this.professionalsUpdated.asObservable();
  }

  public getDistinctCompanies() {
    this.http.get<[]>('http://35.229.84.111:8080/api/v1/professionals/companies')
      .subscribe((res: any) => {
        this.distinctCompanies = res;
        this.companiesUpdated.next({data: res});
      });
  }

  public getDistinctCompaniesUpdateListener() {
    return this.companiesUpdated.asObservable();
  }

  public getDistinctJobTitles() {
    this.http.get<[]>('http://35.229.84.111:8080/api/v1/professionals/jobTitles')
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
    this.http.get<[]>('http://35.229.84.111:8080/api/v1/professionals/companies/' + name)
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
    this.http.get<[]>('http://35.229.84.111:8080/api/v1/professionals/jobTitles/' + name)
      .subscribe((res: any) => {
        this.professionals = res;
        this.jobTitleProfsUpdated.next({data: res});
      });
  }

  public getJobTitleProfsUpdateListener() {
    return this.jobTitleProfsUpdated.asObservable();
  }

  public getUserTemplates() {
    const userObj: any = JSON.parse(this.authService.getUserData());
    if (userObj === null) {
      return;
    }
    this.http.get<[]>('http://35.231.17.134:8080/api/v1/templates/list/' + userObj.user.id)
      .subscribe((res: any) => {
        this.templates = res;
        this.templatesUpdated.next({data: res});
      });
  }

  public getUserTemplatesUpdateListener() {
    return this.templatesUpdated.asObservable();
  }

  public getSavedProfessionals() {
    const userObj: any = JSON.parse(this.authService.getUserData());
    if (userObj === null) {
      return;
    }
    this.http.get<[]>('http://35.231.217.58:8080/api/v1/savedProfessionals/list/' + userObj.user.id)
      .subscribe((res: any) => {
        this.savedProfessionals = res;
        this.savedProfessionalsUpdated.next({data: res});
      });
  }

  public getSavedProfessionalsUpdateListener() {
    return this.savedProfessionalsUpdated.asObservable();
  }
}

