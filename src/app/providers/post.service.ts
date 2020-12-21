import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
const BACKEND_API = environment.API_URL + '/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 
  private postsCollection;
  postsUpdated = new Subject();

  constructor( private http: HttpClient ) { }

  getAllPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{Posts: any, message: string, maxPosts: number}>( BACKEND_API + queryParams )
    .subscribe( (postsData) => {
      console.log(' postsData', postsData)
      this.postsCollection= postsData.Posts;
      console.log(' postsCollection ', this.postsCollection)

      this.postsUpdated.next({
        posts: [...this.postsCollection],
        postCount: postsData.maxPosts
        });
    })
  }

  getAllPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(data: any) {
    return this.http.post<{ message: any }>(BACKEND_API, data );
   }

  getPost(id) {
    return  {...this.postsCollection.find(t => t._id == id)};
  }

  updatePost(id, newData) {
    return this.http.put<{ message: string}>(
      BACKEND_API + id, newData
      );
  }

  deletePost(id) {
    return this.http.delete<{message: string}>( BACKEND_API + id);
  }


}
