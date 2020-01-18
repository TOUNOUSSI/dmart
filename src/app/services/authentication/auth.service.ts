import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { AppComponent } from '../../app.component';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';
import { AccountService } from '../account/account.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of, throwError, from } from 'rxjs';
import { SnackbarService } from '../notifications/toaster/snackbar.service';

@Injectable()
export class AuthService {

    public loggedIn$ = new BehaviorSubject<boolean>(false); // {1}
    canActivatestateChanged = false;
    tokn = '';

    hosts: any = {};

    get isLoggedIn() {

        return this.loggedIn$.asObservable(); // {2}
    }

    constructor(private router: Router, public https: HttpClient,private toasterService: SnackbarService) {

    }


    public logIn(user: User) {
        localStorage.clear();
        return this.https.post(AppComponent.API_URL + '/gmartws-api/authenticate', user).pipe(
            tap((response: any) => {
                localStorage.setItem('Currentuser', user.username);
                localStorage.setItem('Token', response.token);
                this.loggedIn$.next(true);
                this.tokn = response.accessToken;
                this.router.navigate(['/admin/dashboard']);

            }),catchError((err: any) => {
                if(err instanceof HttpErrorResponse){
                    switch(err.status){
                        case 404:{
                            this.toasterService.message = "Impossible de se connecter au serveur"; 
                            break;
                        } 
                        case 404:{
                            this.toasterService.message = "Vous avez pas le droit d'accèder à cette ressource"; 
                            break;
                        }
                        case 402:{
                            this.toasterService.message = 'Identifiant ou mot de passe incorrect'; 
                            break;
                        }
                        case 405:{
                            this.toasterService.message = 'Identifiant ou mot de passe incorrect'; 
                            break;
                        }
                        default:{
                            this.toasterService.message = 'Identifiant ou mot de passe incorrect'; 
                            break;
                        }
                    }
                }else{
                    this.toasterService.message = 'Impossible de se connecter au serveur'; 
     
                }
               
                
                this.toasterService.open();
              return (err instanceof HttpErrorResponse)?   err.error: of(err);
         }));
        
    }



    isLoggedInToWebservice(): boolean {
        try {

            if (this.getToken() === undefined || this.getToken() === '') {
                this.canActivatestateChanged = false;
                this.loggedIn$.next(false);
                localStorage.clear();
                this.router.navigate(['/login']);

            } else {
                this.https.get(AppComponent.API_URL + '/account/isLoggedIn')
                    .subscribe((response: any) => {
                        this.canActivatestateChanged = response;
                        if ((this.canActivatestateChanged === true && this.getToken()) || (this.getToken() === this.getTokenFromWS())) {
                            this.router.navigate(['/dashboard']);

                        } else {
                            this.canActivatestateChanged = false;
                            localStorage.clear();
                            this.loggedIn$.next(false);
                            this.router.navigate(['/login']);

                        }


                    },
                        (error) => {
                            localStorage.clear();
                            this.loggedIn$.next(false);
                            this.router.navigate(['/login']);
                        });

            }

            return this.canActivatestateChanged;

        } catch (error) {
            localStorage.clear();
            this.router.navigate(['/login']);

        }
    }

    public getToken(): string {
        return localStorage.getItem('Token');
    }

    public getTokenFromWS() {
        return this.tokn;
    }

    doLogout() {
        localStorage.clear();
        this.loggedIn$.next(false);
        this.logout();
        this.router.navigate(['/login']);

    }
    logout() {
        return this.https.get(AppComponent.API_URL + '/account/logout')
            .toPromise().then((response: Response) => response)
            .catch(error => {
                this.router.navigate(['/login']);
            });
    }
}
