import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service'
import { User } from '../models/User';
import { UserCredentials } from '../models/UserCredentials';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';



interface TokenResponse { token: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject: BehaviorSubject<User|null>;

  
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService) { 
    
    this.currentUserSubject = new BehaviorSubject<User|null>(JSON.parse(localStorage.getItem('user') as string));
    
  }


  authenticate(userCredentials: UserCredentials): Observable<Object> {

    return this.httpClient.post(environment.LOGIN_API_URL, userCredentials).pipe(

      map(response => {

        const token = (response as TokenResponse).token;
        
        this.cookieService.set('token', token);

        this.userService.getUser(userCredentials.handle).subscribe((user) => {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSubject.next(user);
        });

        return response;

      })
    );
  }

  static getCurrentUser(): User|null {
    
    const user = localStorage.getItem('user');
    if( user !== null ) {
      return JSON.parse(user);
    }
    else {
      return null;
    }
  }

  logout() {
    this.cookieService.delete('token');
    localStorage.clear();
    location.reload();
  }

  


}
