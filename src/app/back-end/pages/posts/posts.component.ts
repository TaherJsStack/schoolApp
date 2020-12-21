import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { mimeType } from 'src/app/mime-type.validator';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { PostService } from 'src/app/providers/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  // styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  
  posts = [];
  postSub:  Subscription;
  postForm;
  // postForm: FormGroup;
  imgReview: string;
  editMode;
  postId;
 
  totalData       = 0;
  dataPerPage     = 10;
  currentPageData = 1;
  dataPageSizeOptions = [10, 20, 30, 40];

  constructor(  private postsSrv: PostService,
                private _flashMessagesService: FlashMessagesService) { }
                
  ngOnInit() {

    this.postForm = new FormGroup ({
      title:        new FormControl(null, Validators.required),
      description:  new FormControl(null, Validators.required),
      image:        new FormControl(null,
        {validators: [
          Validators.required],
          asyncValidators: [mimeType]
        }),
    })

    this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
    this.postSub = this.postsSrv.getAllPostsUpdatedListener()
    .subscribe( ( posts: {posts: any, postCount: number} )=> {
      this.totalData = posts.postCount;
      this.posts     = posts.posts;
      // console.log(' this.currentPageData data =>',  this.currentPageData)
    });

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image').updateValueAndValidity();
    console.log(file);
    // to create prview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPageData =  pageData.pageIndex + 1;
    this.dataPerPage =      pageData.pageSize;
    this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
  }

  onSave() {
    if (this.postForm.invalid ) {
      return;
    }
    console.log('onSave book =>', this.postForm.value )
    const bookData = new FormData();
    bookData.append('title',       this.postForm.value.title);
    bookData.append('imageUrl',    this.postForm.value.image);
    bookData.append('description', this.postForm.value.description);

    if (this.editMode) {
      this.postsSrv.updatePost(this.postId, bookData)
      .subscribe(
        msg => {
          this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {

      this.postsSrv.addPost(bookData)
        .subscribe(
          msg => {
            this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
            this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
          },
          err => {
            this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
          });
    }
    this.editMode = false;
    this.postForm.reset();
    this.imgReview = null;
    this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);

  }

  editPost(){

  }

  deletePost(postId){
    console.log("postId =>", postId);

    if (confirm('Are you sure you want to delete ' + name  + '?') ) {
      this.postsSrv.deletePost(postId)
      .subscribe(
        msg => {
          this.postsSrv.getAllPosts(this.dataPerPage, this.currentPageData);
          this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 4000 });
        },
        err => {
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    }

  
  }


}
