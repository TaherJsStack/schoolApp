import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import Filterizr from 'filterizr';

// This will extend the $.fn prototype with Filterizr
Filterizr.installAsJQueryPlugin($);
// Default options
const options = {
  animationDuration: 0.5, // in seconds

  callbacks: { 
    onFilteringStart: function() { },
    onFilteringEnd: function() { },
    onShufflingStart: function() { },
    onShufflingEnd: function() { },
    onSortingStart: function() { },
    onSortingEnd: function() { },
    controlsSelector: '',
    delay: 0,
    delayMode: 'progressive',
    easing: 'ease-out',
    filter: 'all',
    filterOutCss: {
      opacity: 0,
      transform: 'scale(0.5)'
     },
    filterInCss: {
       opacity: 0,
       transform: 'scale(1)'
    },
    layout: 'sameSize',
    multifilterLogicalOperator: 'and',
    selector: '.filtr-container',
    setupControls: true,
  },
}

@Component({
  selector: 'app-gallery-section',
  templateUrl: './gallery-section.component.html',
  // styleUrls: ['./gallery-section.component.scss']
})
export class GallerySectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const filterizr = new Filterizr('.filter-container', options);
  }

  onButtonGroupClick($event){
    // console.log($event)
    let clickedElement = $event.target || $event.srcElement;
    // console.log( '=> ' + clickedElement.nodeName)
    if( clickedElement.nodeName === "LI" ) {
      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".galllary-active");
      
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("galllary-active");
      }
      clickedElement.className += " galllary-active";
    }
  }


}
