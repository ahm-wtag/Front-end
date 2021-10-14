import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if ( this.cookieService.check('token') ) {
      let tokenizedReq = request.clone({
        setHeaders: {
          Authorization: this.cookieService.get('token')
        }
      });

      return next.handle(tokenizedReq);
    }
    
    return next.handle(request);
  }
}
