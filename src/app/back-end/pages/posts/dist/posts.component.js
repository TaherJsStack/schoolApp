"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var mime_type_validator_1 = require("src/app/mime-type.validator");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(postsSrv, _flashMessagesService) {
        this.postsSrv = postsSrv;
        this._flashMessagesService = _flashMessagesService;
        this.posts = [];
        this.totalData = 0;
        this.dataPerPage = 10;
        this.currentPageData = 1;
        this.dataPageSizeOptions = [10, 20, 30, 40];
    }
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.postForm = new forms_1.FormGroup({
            title: new forms_1.FormControl(null, forms_1.Validators.required),
            description: new forms_1.FormControl(null, forms_1.Validators.required),
            image: new forms_1.FormControl(null, { validators: [
                    forms_1.Validators.required
                ],
                asyncValidators: [mime_type_validator_1.mimeType]
            })
        });
        this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
        this.postSub = this.postsSrv.getAllPostsUpdatedListener()
            .subscribe(function (posts) {
            _this.totalData = posts.postCount;
            _this.posts = posts.posts;
            // console.log(' this.currentPageData data =>',  this.currentPageData)
        });
    };
    PostsComponent.prototype.onImagePicked = function (event) {
        var _this = this;
        var file = event.target.files[0];
        this.postForm.patchValue({ image: file });
        this.postForm.get('image').updateValueAndValidity();
        console.log(file);
        // to create prview
        var reader = new FileReader();
        reader.onload = function () {
            _this.imgReview = reader.result;
        };
        reader.readAsDataURL(file);
    };
    // mat paginator
    PostsComponent.prototype.onChangedPage = function (pageData) {
        console.log('pageData', pageData);
        this.currentPageData = pageData.pageIndex + 1;
        this.dataPerPage = pageData.pageSize;
        this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
    };
    PostsComponent.prototype.onSave = function () {
        var _this = this;
        if (this.postForm.invalid) {
            return;
        }
        console.log('onSave book =>', this.postForm.value);
        var bookData = new FormData();
        bookData.append('title', this.postForm.value.title);
        bookData.append('imageUrl', this.postForm.value.image);
        bookData.append('description', this.postForm.value.description);
        if (this.editMode) {
            this.postsSrv.updatePost(this.postId, bookData)
                .subscribe(function (msg) {
                _this.postsSrv.getAllPosts(_this.dataPerPage, _this.currentPageData);
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
            }, function (err) {
                console.log('err.error=>', err.error.message);
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
        else {
            this.postsSrv.addPost(bookData)
                .subscribe(function (msg) {
                _this.postsSrv.getAllPosts(_this.dataPerPage, _this.currentPageData);
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 4000 });
            }, function (err) {
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
        this.editMode = false;
        this.postForm.reset();
        this.imgReview = null;
        this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
    };
    PostsComponent.prototype.editPost = function () {
    };
    PostsComponent.prototype.deletePost = function (postId) {
        var _this = this;
        console.log("postId =>", postId);
        if (confirm('Are you sure you want to delete ' + name + '?')) {
            this.postsSrv.deletePost(postId)
                .subscribe(function (msg) {
                _this.postsSrv.getAllPosts(_this.dataPerPage, _this.currentPageData);
                _this._flashMessagesService.show(msg.message, { cssClass: 'alert-success flash-message', timeout: 4000 });
            }, function (err) {
                _this._flashMessagesService.show(err.error.message, { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'app-posts',
            templateUrl: './posts.component.html'
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
