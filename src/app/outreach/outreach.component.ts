import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api';

@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html',
  styleUrls: ['./outreach.component.css']
})
export class OutreachComponent implements OnInit {

  savedProfessionals: [] = [];
  columnsToDisplay = ['professionalCompany', 'professionalName', 'professionalJobTitle', 'professionalEmail', 'updatedAt', 'count'];
  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getSavedProfessionals();
    this.apiService.getSavedProfessionalsUpdateListener()
    .subscribe((res) => {
      this.savedProfessionals = (res.data);
    });
  }

}
