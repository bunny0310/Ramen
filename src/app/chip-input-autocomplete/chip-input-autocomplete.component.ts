import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-chip-input-autocomplete',
  templateUrl: './chip-input-autocomplete.component.html',
  styleUrls: ['./chip-input-autocomplete.component.css']
})
export class ChipInputAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  @Input() allData;
  @Input() placeholder;
  @Input() full;
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allData.filter(option => option.toLowerCase().includes(filterValue));
  }

  search() {
  }
}
