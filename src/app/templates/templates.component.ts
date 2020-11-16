import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  templates: any[] = [];
  columnsToDisplay = ['alias', 'template'];
  constructor(private apiService: APIService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.apiService.getUserTemplates();
    this.apiService.getUserTemplatesUpdateListener()
    .subscribe((res) => {
      this.templates = (res.data);
      console.log(this.templates + 'laurence');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '640px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiService.getUserTemplates();
        this.apiService.getUserTemplatesUpdateListener()
        .subscribe((res) => {
          this.templates = (res.data);
          console.log('templates updated!');
        });
        this.snackBar.open('Template added successfully', '', {
          duration: 2000
        });
    } else {
      this.snackBar.open('Template insertion unsuccessful! There\'s some technical issue. Please try again later.', '', {
        duration: 2000
      });
    }

    });
  }

}
