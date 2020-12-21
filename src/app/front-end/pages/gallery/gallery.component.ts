import { Component, OnInit } from '@angular/core';

import Filterizr from 'filterizr';

// Default options
const options = {
  animationDuration: 0.5, // in seconds
  callbacks: { 
    onFilteringStart: function() { },
    onFilteringEnd: function() { },
    onShufflingStart: function() { },
    onShufflingEnd: function() { },
    onSortingStart: function() { },
    onSortingEnd: function() { }
  },
}


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  // styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const filterizr = new Filterizr('.filter-container', options);
  }
    
  onButtonGroupClick($event){
    console.log($event)
    let clickedElement = $event.target || $event.srcElement;
    console.log( '=> ' + clickedElement.nodeName)
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
