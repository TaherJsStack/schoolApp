import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  // styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public showOverlay = true;

  constructor(private router: Router) { }

  ngOnInit() { }

}
