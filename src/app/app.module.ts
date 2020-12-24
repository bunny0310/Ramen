import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
  MatDividerModule, MatCardModule, MatInputModule, MatFormFieldModule, MatChipsModule,
   MatAutocompleteModule, MatTableModule, MatExpansionModule, MatStepperModule, MatProgressBarModule,
    MatPaginatorModule, MatSelectModule, MatMenuModule, MatChipInput, MatCheckboxModule, MatSnackBarModule, MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';
import { RibbonComponent } from './ribbon/ribbon.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthInterceptor } from './interceptors/authInterceptor';
import { HomeComponent } from './home/home.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { ChipInputAutocompleteComponent } from './chip-input-autocomplete/chip-input-autocomplete.component';
import { TemplatesComponent } from './templates/templates.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { OutreachComponent } from './outreach/outreach.component';
import { TrackingComponent } from './tracking/tracking.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RibbonComponent,
    NavBarComponent,
    HomeComponent,
    ProfessionalsComponent,
    ChipInputAutocompleteComponent,
    TemplatesComponent,
    PopupComponent,
    OutreachComponent,
    TrackingComponent
  ],
  entryComponents: [
    PopupComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [AuthInterceptor, {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
