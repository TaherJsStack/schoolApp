"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllLinesComponent = void 0;
var core_1 = require("@angular/core");
var AllLinesComponent = /** @class */ (function () {
    function AllLinesComponent(BusService) {
        this.BusService = BusService;
        this.isSpinner = true;
        this.totalData = 0;
        this.dataPerPage = 20;
        this.currentPageData = 1;
        this.dataPageSizeOptions = [20, 30, 35, 40];
    }
    AllLinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.BusService.getAllLines();
        this.Subscription = this.BusService.getAllLinesUpdatedListener()
            .subscribe(function (linesData) {
            console.log('getAllLines =>', linesData);
            _this.totalData = linesData.postCount;
            _this.buses = linesData.lines;
            _this.isSpinner = false;
        });
    };
    AllLinesComponent.prototype.serchFillter = function (name) {
        var _this = this;
        console.log(name.length);
        if (name.length > 0) {
            this.Subscription = this.BusService.searchByAreaName(name)
                .subscribe(function (bus) {
                _this.buses = [];
                console.log('serchFillter =>', bus.bus);
                _this.buses = bus.bus;
            });
        }
        else {
            this.BusService.getAllLines();
        }
    };
    // mat paginator
    AllLinesComponent.prototype.onChangedPage = function (pageData) {
        console.log('pageData', pageData);
        this.currentPageData = pageData.pageIndex + 1;
        this.dataPerPage = pageData.pageSize;
        // this.parentsSrv.getAllParents(this.dataPerPage, this.currentPageData);
    };
    AllLinesComponent.prototype.onDelete = function (id, name) {
        if (confirm('Are you sure you want to delete ' + name + '?')) {
        }
    };
    AllLinesComponent.prototype.ngOnDestroy = function () {
        this.Subscription.unsubscribe();
    };
    AllLinesComponent = __decorate([
        core_1.Component({
            selector: 'app-all-lines',
            templateUrl: './all-lines.component.html'
        })
    ], AllLinesComponent);
    return AllLinesComponent;
}());
exports.AllLinesComponent = AllLinesComponent;
