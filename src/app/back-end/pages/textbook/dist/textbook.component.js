"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TextbookComponent = void 0;
var core_1 = require("@angular/core");
var TextbookComponent = /** @class */ (function () {
    function TextbookComponent(TeachersService, ClassesService, TextbookService, route, _flashMessagesService) {
        this.TeachersService = TeachersService;
        this.ClassesService = ClassesService;
        this.TextbookService = TextbookService;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.classTextbooks = [];
        this.filteredLevel = [];
        this.isSpinner = true;
        this.totalData = 0;
        this.dataPerPage = 200;
        this.currentPageData = 1;
        this.dataPageSizeOptions = [5, 15, 25, 30];
        this.terms = ['first term', 'second term'];
        this.reload = true;
    }
    TextbookComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.TextbookService.getTextbook();
        this.Subscription = this.TextbookService.getAllTextbooksUpdatedListener()
            .subscribe(function (textbooks) {
            _this.textbooks = textbooks;
            console.log('textbooks =>', textbooks);
            _this.isSpinner = false;
        });
        this.ClassesService.getAllStages();
        this.Subscription = this.ClassesService.getAllStagesUpdatedListener()
            .subscribe(function (stages) {
            // console.log(' classes studentstData =>',  stages)
            _this.stages = stages.stages;
            console.log('this.stages =>', _this.stages);
        });
        this.TeachersService.getAllTeachers(this.dataPerPage, this.currentPageData);
        this.Subscription = this.TeachersService.getAllteachersUpdatedListener()
            .subscribe(function (teacherstData) {
            console.log(' teacherstData =>', teacherstData);
            _this.totalData = teacherstData.postCount;
            _this.teachers = teacherstData.teachers;
        });
    };
    TextbookComponent.prototype.stageChange = function (e) {
        var _this = this;
        // console.log('-=============>', e)
        this.stage = e;
        this.classTextbooks = [];
        this.stages.filter(function (stages) { return stages.stageName === e; })
            .forEach(function (element) {
            console.log('filteredLevel element =>', element);
            _this.filteredLevel = element.leveles;
        });
    };
    TextbookComponent.prototype.levelChange = function (e) {
        // console.log(e)
        this.classTextbooks = [];
        this.getTeachersByStageAndLevel(this.stage, e);
    };
    TextbookComponent.prototype.getTeachersByStageAndLevel = function (stage, level) {
        var _this = this;
        // console.log('stage =>', stage, 'level =>', level)
        this.TeachersService.getTeacherByStage(stage)
            .subscribe(function (teachers) {
            console.log('stage level teachers =>', teachers);
            _this.teachers = teachers.teachers;
        }, function (err) { console.log('stage level teachers err =>', err); });
    };
    TextbookComponent.prototype.teacherClick = function (data) {
        console.log(data.name);
        this.teacherData = data.name.firstname + ' ' + data.name.lastname;
    };
    TextbookComponent.prototype.onSaveSubject = function (data) {
        // console.log('onSaveSubject =>', data)
        var textbookData = {
            subjectName: data.value.subjectName,
            teatcherId: data.value.teatcherId,
            teacherName: this.teacherData
        };
        this.classTextbooks.push(textbookData);
        data.resetForm();
        this.studentsMeg = '';
        // console.log('this.classTextbooks =>', this.classTextbooks)
    };
    TextbookComponent.prototype.removeSubjrc = function (index) {
        this.classTextbooks.splice(index, 1);
    };
    TextbookComponent.prototype.onSave = function (textbookData) {
        var _this = this;
        console.log('onSave =>', textbookData.value);
        if (this.classTextbooks.length > 0) {
            var newSubject = {
                stage: textbookData.value.educationStage,
                level: textbookData.value.level,
                term: textbookData.value.term,
                notes: textbookData.value.notes,
                creator: '22222',
                created_at: new Date(),
                textBooks: this.classTextbooks
            };
            console.log('newSubject =>', newSubject);
            this.TextbookService.addTextbook(newSubject)
                .subscribe(function (msg) {
                _this.studentsMeg = '';
                _this.classTextbooks = [];
                textbookData.resetForm();
                _this.ClassesService.getAllStages();
                _this.TextbookService.getTextbook();
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
            }, function (err) {
                console.log('err.error=>', err.error);
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
        else {
            console.log('length is less than 1 studrnt');
            this.studentsMeg = 'please add textbooks  ';
        }
    };
    TextbookComponent.prototype.OnDestroy = function () {
        this.Subscription.unsubscribe();
    };
    TextbookComponent = __decorate([
        core_1.Component({
            selector: 'app-textbook',
            templateUrl: './textbook.component.html'
        })
    ], TextbookComponent);
    return TextbookComponent;
}());
exports.TextbookComponent = TextbookComponent;
