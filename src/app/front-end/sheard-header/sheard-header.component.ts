import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sheard-header',
  templateUrl: './sheard-header.component.html',
  // styleUrls: ['./sheard-header.component.scss']
})
export class SheardHeaderComponent implements OnInit {

  @Input('bgImgage') bgImgage: any;
  @Input('pgTitle') pgTitle: any;

  bg:string;
  
  constructor() { }

  ngOnInit() {
    this.bg = "assets/image/menubg/" + this.bgImgage ;
  }
 

}
