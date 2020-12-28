import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api';

@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html',
  styleUrls: ['./outreach.component.css']
})
export class OutreachComponent implements OnInit {

  savedProfessionals: [] = [];
  loading = false;
  columnsToDisplay = ['professionalCompany', 'professionalName', 'professionalJobTitle',
  'updatedAt', 'count', 'template', 'send'];
  value = '';
  templates: any[] = [];
  templateMap = new Map();
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

  updateSP(sp) {
    const id = sp.id;
    const templateId = this.value;
    const email = sp.professionalEmail;
    const data = {
      id,
      templateId
    };
    this.loading = true;
    this.apiService.updateSP(data, this.templateMap.get(templateId), email);
    this.loading = false;
  }

}
