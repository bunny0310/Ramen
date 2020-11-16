import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public obj = null;
  constructor(public auth: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(val => {
      this.ngOnInit();
    });
   }

  ngOnInit() {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.obj = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user'));
    if (this.obj === null) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
