import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  @Input() title = '';
  constructor() { }

  ngOnInit() {
  }

}
