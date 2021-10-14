import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/Post';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
}



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getPosts() : Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.POSTS_API_URL);
  }

  getPostById(postId: number): Observable<Post> {
    const reqUrl = `${environment.POSTS_API_URL}/${postId}`;
    return this.httpClient.get<Post>(reqUrl);
  }

  createPost(newPost: Post, userId: number): Observable<Post> {

    const reqUrl = `${environment.USERS_API_URL}/${userId}/posts`;

    return this.httpClient.post<Post>(reqUrl, newPost, httpOptions);

  }

  deletePost(postToDelete: Post, userId: number) {

    const requrl = `${environment.USERS_API_URL}/${userId}/posts/${postToDelete.id}`;

    return this.httpClient.delete(requrl);
  }

  updatePost(newPost: Post, oldPost: Post) {
    const reqUrl = `${environment.USERS_API_URL}/${oldPost.customerId}/posts/${oldPost.id}`;
    return this.httpClient.put(reqUrl,newPost);
  }

}
