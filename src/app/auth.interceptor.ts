import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log(this.authService.token);



     var isLoggedIn = localStorage.getItem('authToken');
     if(isLoggedIn){
      request = request.clone({
        headers : request.headers.set("Authorization","Bearer " + this.authService.token),
      })
     }
     else {
      request = request.clone();
     }







    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : AuthInterceptor,
  multi : true,
};
