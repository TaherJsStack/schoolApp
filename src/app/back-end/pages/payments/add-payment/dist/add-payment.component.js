"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddPaymentComponent = void 0;
var core_1 = require("@angular/core");
var AddPaymentComponent = /** @class */ (function () {
    function AddPaymentComponent(studentsSrv, paymentsSrv, route, _flashMessagesService) {
        this.studentsSrv = studentsSrv;
        this.paymentsSrv = paymentsSrv;
        this.route = route;
        this._flashMessagesService = _flashMessagesService;
        this.editMode = false;
        this.isPayForm = false;
        this.bassValue = 0;
        this.booksValue = 0;
        this.schoolValue = 0;
        this.clothesValue = 0;
        this.reload = true;
        this.totalData = 0;
        this.dataPerPage = 5;
        this.currentPageData = 1;
        this.dataPageSizeOptions = [5, 15, 25, 30];
    }
    AddPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.paymentsSrv.getAllPayments(this.dataPerPage, this.currentPageData);
        this.paymentSub = this.paymentsSrv.getAllPaymentsUpdatedListener()
            .subscribe(function (payments) {
            _this.totalData = payments.postCount;
            // this.filtteredPro  = studentstData.students;
            _this.payments = payments.payments;
        });
    };
    // mat paginator
    AddPaymentComponent.prototype.onChangedPage = function (pageData) {
        this.currentPageData = pageData.pageIndex + 1;
        this.dataPerPage = pageData.pageSize;
        this.paymentsSrv.getAllPayments(this.dataPerPage, this.currentPageData);
    };
    AddPaymentComponent.prototype.serchFillter = function (query) {
        var _this = this;
        if (query.length == 4 || query.length > 4) {
            this.studentsSrv.studentSearch(query)
                .subscribe(function (msg) {
                _this.bassValue = 0;
                _this.booksValue = 0;
                _this.schoolValue = 0;
                _this.clothesValue = 0;
                _this.student = msg.student;
                // this.paymentsSrv.paySearch(this.student._id)
                //   .subscribe( studentPayment => {
                //     // console.log('this paymentsSrv getPay =>', studentPayment)
                //     this.studentPayment = studentPayment;
                //   });
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
            }, function (err) {
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
        else {
            this.isPayForm = false;
            this.student = null;
        }
    };
    AddPaymentComponent.prototype.onPay = function (studentId) {
        var _this = this;
        this.isPayForm = true;
        this.paymentsSrv.paySearch(studentId)
            .subscribe(function (studentPayment) {
            _this.studentPayment = studentPayment.student;
            if (studentPayment.student) {
                _this.isPayForm = true;
                _this.bassValue = _this.studentPayment.bass;
                _this.booksValue = _this.studentPayment.books;
                _this.schoolValue = _this.studentPayment.school;
                _this.clothesValue = _this.studentPayment.clothes;
            }
        });
    };
    // onCheckboxChagen(event, value) {
    //   if (value == 'elementary') {
    //     this.educationalStage.elementary = event.checked;
    //   } 
    //   if (value == 'preschool') {
    //     this.educationalStage.preschool = event.checked;
    //   } 
    //   if (value == 'middle') {
    //     this.educationalStage.middle = event.checked;
    //   } 
    //   if (value == 'high') {
    //     this.educationalStage.high = event.checked;
    //   } 
    // }
    AddPaymentComponent.prototype.onSchoolChange = function (evant) {
        if (evant.checked) {
            this.schoolValue = 800;
        }
        else {
            this.schoolValue = 0;
        }
    };
    AddPaymentComponent.prototype.onBooksChange = function (evant) {
        if (evant.checked) {
            this.booksValue = 90;
        }
        else {
            this.booksValue = 0;
        }
    };
    AddPaymentComponent.prototype.onClothesChange = function (evant) {
        console.log('(change)', evant.checked);
        if (evant.checked) {
            this.clothesValue = 99;
        }
        else {
            this.clothesValue = 0;
        }
    };
    AddPaymentComponent.prototype.onBassChange = function (evant) {
        console.log('(change)', evant.checked);
        if (evant.checked) {
            this.bassValue = 300;
        }
        else {
            this.bassValue = 0;
        }
    };
    AddPaymentComponent.prototype.refresh = function () {
        var _this = this;
        this.reload = false;
        setTimeout(function (x) { return _this.reload = true; }, 0);
        this.ngOnInit();
    };
    AddPaymentComponent.prototype.onSave = function () {
        var _this = this;
        var payData = {
            bass: this.bassValue,
            books: this.booksValue,
            school: this.schoolValue,
            clothes: this.clothesValue,
            student: this.student,
            student_id: this.student._id,
            studentName: this.student.name.firstname + ' ' + this.student.name.lastname,
            studentStage: this.student.educationalStage,
            creator_id: '222',
            added_at: new Date()
        };
        if (this.studentPayment) {
            this.paymentsSrv.updatePay(this.studentPayment._id, payData)
                .subscribe(function (msg) {
                _this.isPayForm = false;
                _this.student = null;
                _this.studentPayment = [];
                _this.bassValue = 0;
                _this.booksValue = 0;
                _this.schoolValue = 0;
                _this.clothesValue = 0;
                _this.paymentsSrv.getAllPayments(_this.dataPerPage, _this.currentPageData);
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 4000 });
            }, function (err) {
                console.log('err.error=>', err.error.message);
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
        else {
            this.paymentsSrv.addPay(payData)
                .subscribe(function (msg) {
                _this.isPayForm = false;
                _this.student = null;
                _this.paymentsSrv.getAllPayments(_this.dataPerPage, _this.currentPageData);
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 4000 });
            }, function (err) {
                console.log('err.error=>', err.error.message);
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
    };
    AddPaymentComponent.prototype.ngOnDestroy = function () {
        this.paymentSub.unsubscribe();
    };
    AddPaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-add-payment',
            templateUrl: './add-payment.component.html'
        })
    ], AddPaymentComponent);
    return AddPaymentComponent;
}());
exports.AddPaymentComponent = AddPaymentComponent;
