import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UrlPermission implements CanActivate {

  constructor(private router: Router, private authservice: AuthService, public https: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authservice.isLoggedIn) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      return false;

    }

  }
}
