import { Directive, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {

  constructor( private elementRef: ElementRef) { }

  @HostListener('window:scroll', ['$event.target']) onWindowScroll(targetElement) {
   
    const scrollTop = document.documentElement.scrollTop;
  
    if (scrollTop === 630 || scrollTop > 630) {
      this.elementRef.nativeElement.style.display = 'inline';
    } else {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

  @HostListener('click', ['$event']) onBackToTopPage($event){
    // console.info('clicked: ' + $event);
    // document.querySelector(".fixed-top").scrollIntoView({ behavior: 'smooth', block: 'end'});
    // document.documentElement.scrollTop = 0;

    $('html,body').animate({
      scrollTop: $(".slider").offset().top},
      'slow');
    // });
  }

}
