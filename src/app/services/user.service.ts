import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/Post';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(handle: string): Observable<User> {
    const reqUrl = `${environment.USERS_API_URL}/${handle}`;
    return this.httpClient.get<User>(reqUrl);
  }

  postUser(userDetails: User): Observable<User> {
    const reqUrl = `${environment.USERS_API_URL}`;
    return this.httpClient.post<User>(reqUrl,userDetails);
  }
  
  getUserPosts(userId: number|undefined): Observable<Post[]> {

    const reqUrl = `${environment.USERS_API_URL}/${userId}/posts`;

    return this.httpClient.get<Post[]>(reqUrl);
  }


  updateUser(user: User,password: string, userId: number) {
    
    const reqUrl = `${environment.USERS_API_URL}/${userId}`;
    user.password = password;
    return this.httpClient.put<User>(reqUrl,user);


  }

}
