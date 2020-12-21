"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ScrollTopDirective = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var ScrollTopDirective = /** @class */ (function () {
    function ScrollTopDirective(elementRef) {
        this.elementRef = elementRef;
    }
    ScrollTopDirective.prototype.onWindowScroll = function (targetElement) {
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop === 630 || scrollTop > 630) {
            this.elementRef.nativeElement.style.display = 'inline';
        }
        else {
            this.elementRef.nativeElement.style.display = 'none';
        }
    };
    ScrollTopDirective.prototype.onBackToTopPage = function ($event) {
        // console.info('clicked: ' + $event);
        // document.querySelector(".fixed-top").scrollIntoView({ behavior: 'smooth', block: 'end'});
        // document.documentElement.scrollTop = 0;
        $('html,body').animate({
            scrollTop: $(".slider").offset().top
        }, 'slow');
        // });
    };
    __decorate([
        core_1.HostListener('window:scroll', ['$event.target'])
    ], ScrollTopDirective.prototype, "onWindowScroll");
    __decorate([
        core_1.HostListener('click', ['$event'])
    ], ScrollTopDirective.prototype, "onBackToTopPage");
    ScrollTopDirective = __decorate([
        core_1.Directive({
            selector: '[appScrollTop]'
        })
    ], ScrollTopDirective);
    return ScrollTopDirective;
}());
exports.ScrollTopDirective = ScrollTopDirective;
