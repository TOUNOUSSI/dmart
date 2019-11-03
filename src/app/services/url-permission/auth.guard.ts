/*
 *    Project:	#######
 *    Version:	2.0.0
 *    Date:		9 août 2018 11:53:08
 *    Author:	youssef.tounoussi
 *
 */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { take } from 'rxjs/operators';

// @Author : Youssef TOUNOUSSI
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Redéfinition  de la fonction
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = await this.authService.isLoggedIn
      .pipe(take(1))// {1}
      .toPromise(); // {2}
    try {
      if (!(localStorage.getItem('Token') === undefined) || !(localStorage.getItem('Token') === '')) {
        if (!this.authService.isLoggedInToWebservice()) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
