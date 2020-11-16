import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../services/api';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from '../services/auth';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {

  professionals: any[] = [];
  listCompanies: any[] = [];
  listJobTitles: any[] = [];
  savedProfessionals: any[] = [];
  count = 0;
  columnsToDisplay = ['company', 'jobTitle', 'firstName', 'lastName', 'workEmail', 'selected'];
  myControl = new FormControl();
  myControl1 = new FormControl();
  @Input() full;
  filteredOptionsCompanies: Observable<string[]>;
  filteredOptionsJobTitles: Observable<string[]>;
  userObj;

  // array to store search choices
  choices: string[] = ['company', 'jobTitle'];


  constructor(private apiService: APIService, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    // initalize userobj
    this.userObj = JSON.parse(this.authService.getUserData());

    // initialize professionals
    this.apiService.getProfessionals();
    this.apiService.getProfessionalsUpdateListener()
    .subscribe((res) => {
      this.professionals = (res.data);
    });

    // initialize distinct companies
    this.apiService.getDistinctCompanies();
    this.apiService.getDistinctCompaniesUpdateListener()
    .subscribe((res) => {
      this.listCompanies = (res.data);
    });

    // initialize distinct job titles
    this.apiService.getDistinctJobTitles();
    this.apiService.getDistinctJobTitlesUpdateListener()
    .subscribe((res) => {
      this.listJobTitles = (res.data);
    });

    // set some settings for autocomplete
    this.filteredOptionsCompanies = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.listCompanies))
    );

    this.filteredOptionsJobTitles = this.myControl1.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value, this.listJobTitles))
    );
  }

  private _filter(value: string, data: any[]): string[] {
    const filterValue = value.toLowerCase();

    return data.filter(option => option.toLowerCase().includes(filterValue));
  }

  public search(choice: number) {
    if (choice === 0) {
      if (this.myControl.value === '') {
        return;
      }
      this.apiService.getCompanyProfs(this.myControl.value);
      this.apiService.getCompanyProfsUpdateListener()
      .subscribe((res) => {
        this.professionals = (res.data);
      });
    } else {
      if (this.myControl1.value === '') {
        return;
      }
      this.apiService.getJobTitleProfs(this.myControl1.value);
      this.apiService.getJobTitleProfsUpdateListener()
      .subscribe((res) => {
        this.professionals = (res.data);
      });
    }
  }

  addToList($event, element) {
    if (this.userObj === undefined) {
      return;
    }

    const savedProfessional = {
      userId: this.userObj.user.id,
      professionalId : element.id
    };

    if ($event.checked) {
      this.count++;
      this.savedProfessionals.push(savedProfessional);
    } else if (!$event.checked) {
      this.count--;
      this.savedProfessionals.splice(this.findIndexSavedProfessionals(savedProfessional), 1);
    }
    console.log(this.savedProfessionals);
  }

  findIndexSavedProfessionals(elem) {
    let i = 0;
    for (const sp of this.savedProfessionals) {
      if (sp.professionalId === elem.professionalId) {
        return i;
      }
      i++;
    }
    return -1;
  }

  insertSavedProfessionals() {
    if (this.savedProfessionals.length === 0) {
      this.snackBar.open('Please select at least one professional', '', {
        duration: 2000
      });
    }
  }

}
