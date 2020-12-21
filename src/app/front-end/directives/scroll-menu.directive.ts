import { Directive, Input, ElementRef, HostListener } from '@angular/core';

import * as $ from 'jquery';

@Directive({
  selector: '[appScrollMenu]'
})
export class ScrollMenuDirective {

  getHeight = $(window).height();
  backToTopPage = false;
  value;

  constructor() { }

  @HostListener('window:scroll', []) onWindowScroll() {
    // it created for top line mat-progress-bar
    // console.log('scrollTop =>', document.documentElement.scrollTop);
    const scrollTop = document.documentElement.scrollTop;
    const s = $(window).scrollTop();
    const d = $(document).height();
    const c = $(window).height();
    const scrollPercent = (s / (d - c)) * 100;
    const position = scrollPercent;
    this.value = position;

    // to fix nave top
    if (scrollTop === 200 || scrollTop > 200) {
      $('.top-menu').addClass(' fixed-top-effect');
    } else {
      $('.top-menu').removeClass(' fixed-top-effect');
    }
    // back To Top Page button ( show / hide )
    if (scrollTop === 630 || scrollTop > 630) {
      this.backToTopPage = true;
    } else {
      this.backToTopPage = false;
    }
  }
  
}
