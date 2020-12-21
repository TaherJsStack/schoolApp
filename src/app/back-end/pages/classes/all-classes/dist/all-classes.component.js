"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllClassesComponent = void 0;
var core_1 = require("@angular/core");
var AllClassesComponent = /** @class */ (function () {
    function AllClassesComponent(classesSrv) {
        this.classesSrv = classesSrv;
        this.isClassSpinner = true;
    }
    AllClassesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.classesSrv.getAllStages();
        this.subscription = this.classesSrv.getAllStagesUpdatedListener()
            .subscribe(function (stages) {
            // console.log(' stages studentstData =>',  stages)
            _this.stages = stages.stages;
            // console.log(' this.stages =>',  this.stages[0].leveles[0]._id)
            _this.classesSrv.getLevelClasses(_this.stages[0].leveles[0]._id);
        });
    };
    AllClassesComponent.prototype.onGetClasses = function (levelId) {
        var _this = this;
        // console.log('onGetClasses levelId =>', levelId)
        this.subscription.unsubscribe();
        this.classesSrv.getLevelClasses(levelId);
        this.subscription = this.classesSrv.getLevelClassesUpdatedListener()
            .subscribe(function (classes) {
            // console.log(' classes studentstData =>', classes)
            _this.classes = classes.classes;
        });
    };
    AllClassesComponent.prototype.tabChanged = function (e) {
        // console.log('afterViewInit =>', e);
        // console.log('afterViewInit =>', e.tab.textLabel);
        this.subscription.unsubscribe();
        this.classesSrv.getLevelClasses(this.stages[0].leveles[0]._id);
    };
    AllClassesComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AllClassesComponent = __decorate([
        core_1.Component({
            selector: 'app-all-classes',
            templateUrl: './all-classes.component.html'
        })
    ], AllClassesComponent);
    return AllClassesComponent;
}());
exports.AllClassesComponent = AllClassesComponent;
