import { Injectable } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { nbind } from 'q';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  private loginFormStatus: boolean;
  private templateFormStatus: boolean;

  constructor() { }

  public setLoginFormStatus(value: boolean) {
      this.loginFormStatus = value;
  }
  public getLoginFormStatus() {
    return this.loginFormStatus;
  }

  public setTemplateFormStatus(value: boolean) {
    this.loginFormStatus = value;
}
public getTemplateFormStatus() {
  return this.loginFormStatus;
}

}
