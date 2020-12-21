"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllParentsComponent = void 0;
var core_1 = require("@angular/core");
var AllParentsComponent = /** @class */ (function () {
    function AllParentsComponent(parentsSrv, _flashMessagesService, SettingsService, translate) {
        this.parentsSrv = parentsSrv;
        this._flashMessagesService = _flashMessagesService;
        this.SettingsService = SettingsService;
        this.translate = translate;
        this.isSpinner = true;
        this.totalData = 0;
        this.dataPerPage = 5;
        this.currentPageData = 1;
        this.dataPageSizeOptions = [5, 15, 25, 30, 50, 100];
    }
    AllParentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.textDir = localStorage.getItem('lang');
        this.translate.use(localStorage.getItem('lang'));
        this.SettingsService.getLangStorage().subscribe(function (data) {
            _this.textDir = localStorage.getItem('lang');
            _this.translate.use(localStorage.getItem('lang'));
            console.log('getLangStorage =>', data);
            console.log('textDir =>', _this.textDir);
        });
        this.parentsSrv.getAllParents(this.dataPerPage, this.currentPageData);
        this.parentsSub = this.parentsSrv.getAllParentsUpdatedListener()
            .subscribe(function (parentstData) {
            console.log('parentstData =>', parentstData);
            _this.totalData = parentstData.postCount;
            _this.parents = parentstData.parents;
            _this.isSpinner = false;
        });
        // get All parents from services
        // this.parentsSrv.getAllParents(this.catsPerPage, this.catsCurrentPage);
        // console.log('getAllParents =>', this.parents)
        // this.parentsSub = this.parentsSrv.getAllParentsUpdatedListener()
        // .subscribe( (productData)=> {
        //   console.log('this.productsSub => ', productData)
        //   this.parents = productData; 
        // });
    };
    AllParentsComponent.prototype.getChildesCount = function (parentEmail, parentPhone) {
        // this.parentsSrv.getParentChilds(parentEmail, parentPhone)
        //   .subscribe( childes => {
        //     // return childes.childes.count
        //     console.log('childes.childes =>', childes.childes.length)
        //   });
    };
    AllParentsComponent.prototype.serchFillter = function (email) {
        var _this = this;
        if (email.length > 0) {
            console.log('======================================', email);
            this.parentsSub = this.parentsSrv.searchFindOne(email)
                .subscribe(function (parent) {
                console.log('parentstData =>', parent);
                if (parent.parents.length == 0) {
                    _this.parentsSrv.getAllParents(_this.dataPerPage, _this.currentPageData);
                }
                else {
                    _this.parents = parent.parents;
                }
            }, function (err) { return console.log('======>', err); });
        }
    };
    // mat paginator
    AllParentsComponent.prototype.onChangedPage = function (pageData) {
        console.log('pageData', pageData);
        this.currentPageData = pageData.pageIndex + 1;
        this.dataPerPage = pageData.pageSize;
        this.parentsSrv.getAllParents(this.dataPerPage, this.currentPageData);
    };
    AllParentsComponent.prototype.changeProState = function (proID, event) {
        var prodState = {
            id: proID.toString(),
            showProduct: event.checked.toString()
        };
        if (confirm('Are you sure ' + event.checked + ' ?')) {
            // this.proService.updateProState(proID, prodState).subscribe(
            //   msg => {
            //     this.proService.getAllProducts(this.dataPerPage, this.currentPageData);
            //     this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
            //   },
            //   err => {
            //     console.log('err.error=>', err.error.message);
            //     this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
            //   });
        }
    };
    AllParentsComponent.prototype.onDelete = function (id, name, email, phone) {
        var _this = this;
        if (confirm('Are you sure you want to delete ' + name + '?')) {
            this.parentsSrv.deleteParent(email, phone, id)
                .subscribe(function (msg) {
                _this.parentsSrv.getAllParents(_this.dataPerPage, _this.currentPageData);
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
            });
        }
    };
    AllParentsComponent.prototype.ngOnDestroy = function () {
        // this.productsSub.unsubscribe();
    };
    AllParentsComponent = __decorate([
        core_1.Component({
            selector: 'app-parents',
            templateUrl: './parents.component.html'
        })
    ], AllParentsComponent);
    return AllParentsComponent;
}());
exports.AllParentsComponent = AllParentsComponent;
