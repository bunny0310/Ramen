import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  savedProfessionals: [] = [];
  columnsToDisplay = ['professionalCompany', 'professionalName', 'professionalJobTitle',
  'updatedAt', 'count', 'template', 'nextEmail'];
  value = '';
  templates: any[] = [];
  templateMap = new Map();
  loading = false;
  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.loading = true;
    this.apiService.getSavedProfessionals();
    this.apiService.getSavedProfessionalsUpdateListener()
    .subscribe((res) => {
      this.savedProfessionals = (res.data);
    });
    this.apiService.getUserTemplates();
    this.apiService.getUserTemplatesUpdateListener()
    .subscribe((res) => {
      this.templates = (res.data);
      for (const template of this.templates) {
        this.templateMap.set(template.id, template);
      }
      this.loading = false;
    });
  }

  public getTemplate(tid) {
    return this.templateMap.has(tid) ? this.templateMap.get(tid) : null;
  }

}
