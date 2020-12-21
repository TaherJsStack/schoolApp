"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BackendRoutingModule = void 0;
var results_component_1 = require("./pages/results/results.component");
var textbook_component_1 = require("./pages/textbook/textbook.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var backend_component_1 = require("./backend.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var notice_component_1 = require("./pages/notice/notice.component");
var auth_guard_1 = require("../providers/auth.guard");
var page404_component_1 = require("./users/page404/page404.component");
var notification_component_1 = require("./pages/notification/notification.component");
var posts_component_1 = require("./pages/posts/posts.component");
var routes = [
    {
        path: '', component: backend_component_1.BackendComponent,
        children: [
            // { path: '', component: UsersComponent, children: [
            //   { path: '', component: LoginComponent},
            //   { path: '404', component: Page404Component},
            //   { path: '500', component: Page500Component},
            //   { path: 'forgotPassword', component: ForgotPasswordComponent },
            //   ]},
            {
                path: '',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./users/users.module'); }).then(function (m) { return m.UsersModule; });
                }
            },
            { path: '', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
            {
                path: 'user',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/user/user.module'); }).then(function (m) { return m.UserModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'parents',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/parents/parents.module'); }).then(function (m) { return m.ParentsModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'students',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/students/students.module'); }).then(function (m) { return m.StudentsModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'teachers',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/teachers/teachers.module'); }).then(function (m) { return m.TeachersModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'employees',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/employees/employees.module'); }).then(function (m) { return m.EmployeesModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'payments',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/payments/payments.module'); }).then(function (m) { return m.PaymentsModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'classes',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/classes/classes.module'); }).then(function (m) { return m.ClassesModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'exames',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/exames/exames.module'); }).then(function (m) { return m.ExamesModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'bus',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/bus/bus.module'); }).then(function (m) { return m.BusModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            {
                path: 'attendes',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/attendes/attendes.module'); }).then(function (m) { return m.AttendesModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            { path: 'textbook', component: textbook_component_1.TextbookComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'results', component: results_component_1.ResultsComponent, canActivate: [auth_guard_1.AuthGuard] },
            {
                path: 'library',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./pages/library/library.module'); }).then(function (m) { return m.LibraryModule; });
                },
                canActivate: [auth_guard_1.AuthGuard]
            },
            { path: 'posts', component: posts_component_1.PostsComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'notification', component: notification_component_1.NotificationComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'notice', component: notice_component_1.NoticeComponent, canActivate: [auth_guard_1.AuthGuard] },
            // { path: '', redirectTo: '/heroes', pathMatch: 'full' },
            { path: '**', component: page404_component_1.Page404Component }
        ]
    },
];
var BackendRoutingModule = /** @class */ (function () {
    function BackendRoutingModule() {
    }
    BackendRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], BackendRoutingModule);
    return BackendRoutingModule;
}());
exports.BackendRoutingModule = BackendRoutingModule;
