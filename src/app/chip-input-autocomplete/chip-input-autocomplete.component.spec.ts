import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipInputAutocompleteComponent } from './chip-input-autocomplete.component';

describe('ChipInputAutocompleteComponent', () => {
  let component: ChipInputAutocompleteComponent;
  let fixture: ComponentFixture<ChipInputAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipInputAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
