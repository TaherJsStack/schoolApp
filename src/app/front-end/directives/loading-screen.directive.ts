import { Directive, Input, ElementRef, HostListener, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Directive({
  selector: '[appLoadingScreen]'
})
export class LoadingScreenDirective {

  pageUrl;

  constructor(private el: ElementRef, private renderer: Renderer, private router: Router) { }
  
  @HostListener('window:load', ['$event']) onWindow($event) {
    
    // console.log("event =>", $event.srcElement.URL);

    $('.loading-screen').fadeOut();
    this.renderer.setElementStyle(this.el.nativeElement, 'color', "#000");
  }

  // @HostListener('window:click', ['$event.target'])
  // @HostListener('window:click', ['$event'])
  // onClick($event) {
    
  //   if (this.pageUrl != this.router.url) {
  //     $('.loading-screen').fadeIn();
  //     $(document).ready(function() {
  //       console.log("appLoadingScreen")
  //       $('.loading-screen').fadeOut();
  //     });
  //     this.pageUrl = this.router.url;
  //   } 
  //   if (this.pageUrl == this.router.url) {
  //     $('.loading-screen').fadeOut();  
  //   }
  // }

}
