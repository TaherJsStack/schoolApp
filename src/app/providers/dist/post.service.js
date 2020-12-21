"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PostService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../environments/environment");
var BACKEND_API = environment_1.environment.API_URL + '/posts/';
var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.postsUpdated = new rxjs_1.Subject();
    }
    PostService.prototype.getAllPosts = function (postsPerPage, currentPage) {
        var _this = this;
        var queryParams = "?pagesize=" + postsPerPage + "&page=" + currentPage;
        return this.http.get(BACKEND_API + queryParams)
            .subscribe(function (postsData) {
            console.log(' postsData', postsData);
            _this.postsCollection = postsData.Posts;
            console.log(' postsCollection ', _this.postsCollection);
            _this.postsUpdated.next({
                posts: __spreadArrays(_this.postsCollection),
                postCount: postsData.maxPosts
            });
        });
    };
    PostService.prototype.getAllPostsUpdatedListener = function () {
        return this.postsUpdated.asObservable();
    };
    PostService.prototype.addPost = function (data) {
        return this.http.post(BACKEND_API, data);
    };
    PostService.prototype.getPost = function (id) {
        return __assign({}, this.postsCollection.find(function (t) { return t._id == id; }));
    };
    PostService.prototype.updatePost = function (id, newData) {
        return this.http.put(BACKEND_API + id, newData);
    };
    PostService.prototype.deletePost = function (id) {
        return this.http["delete"](BACKEND_API + id);
    };
    PostService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
