import { Directive, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNumberCounter]'
})
export class NumberCounterDirective implements OnInit {

  @Input('n-end') end : number;
  @Input('n-duration') dura : number;
  @Input() opjId: String;

  opjName;
  itAllDone: boolean = false;
  constructor() { }

  ngOnInit() { }

  animateValue( start, end, duration, opjname) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      opjname.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);

      this.itAllDone = true;
    }
    
    @HostListener("window:scroll", ["$event"])
    onWindowScroll(event){
      var element = document.querySelector('#counter');
      var position = element.getBoundingClientRect();
    
      // // checking whether fully visible
      // if(position.top >= 0 && position.bottom <= window.innerHeight) {
      //   console.log('Element is fully visible in screen');
      // }
    
      // checking for partial visibility
      if(position.top < window.innerHeight) {
        this.opjName = document.getElementById(this.opjId.toString());
        if (this.itAllDone) {
            // console.log("itAllDone once.....")          
        } else {
          this.animateValue( 0, this.end, 5000, this.opjName  );          
        }
      }
    }
  }
