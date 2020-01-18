/*
 *    Project:	#######
 *    Version:	2.0.0
 *    Date:		9 août 2018 11:53:08
 *    Author:	Youssef Tounoussi 
 *
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  constructor(private router: Router, public auth: AuthService) { }

  //Redéfinition de la fonction intercept
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      console.log("interceptor called")
      let token = this.auth.getToken() as string;
      if (token != null) {
        request = request.clone({
          setHeaders: {
            'Content-type': 'application/json',
            Authorization: 'GMART_AUTHORIZATION '+token,
            Token: token,
            "Access-Control-Allow-Origin":  "http://localhost:4200"
                    }
        });
      } else {
        request = request.clone({
          setHeaders: {
            'Content-type': 'application/json',
            Authorization: 'GMART_AUTHORIZATION',
            Token: '',
            "Access-Control-Allow-Origin":  "http://localhost:4200"
          }
        });
      }

      return next.handle(request)
    } catch (error) {
      console.log(error)
    }


  }
}