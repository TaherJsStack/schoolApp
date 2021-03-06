"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoiceComponent = void 0;
var core_1 = require("@angular/core");
var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent(StudentsService, route, PaymentsService) {
        this.StudentsService = StudentsService;
        this.route = route;
        this.PaymentsService = PaymentsService;
        this.date = new Date();
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .subscribe(function (paramMap) {
            if (paramMap.has('id')) {
                _this.PaymentsService.paySearch(paramMap.get('id')).
                    subscribe(function (payment) {
                    _this.payment = payment.student;
                    _this.StudentsService.studentSearchById(payment.student.student_id)
                        .subscribe(function (student) {
                        _this.student = student.student;
                    });
                });
            }
        });
    };
    InvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html'
        })
    ], InvoiceComponent);
    return InvoiceComponent;
}());
exports.InvoiceComponent = InvoiceComponent;
