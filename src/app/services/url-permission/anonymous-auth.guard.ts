import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import {
    CanActivate,
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AnonymousGuardService implements CanActivate {
    res = false;

    canActivate(): Promise<boolean> {
        if (localStorage.getItem('Token') !== undefined ) {
            return Promise.resolve(false);
        } else {
            localStorage.removeItem('Token');
            localStorage.removeItem('Currentuser');
            this.authService.isLoggedInToWebservice();
            return Promise.resolve(true);
        }

    }

    constructor(private router: Router, private authGuard: AuthGuard, private authService: AuthService) {

    }

}
