import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { AppComponent } from '../../app.component';
import { Observable, throwError } from 'rxjs';
import 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AccountService {

  userAuth: User;
  errorMessage: string;
  constructor(private https: HttpClient) { }
  getUser(): Observable<any> {
    return this.https.get(AppComponent.API_URL + '/account/getUser').pipe(
      map((response: any) => response),
      catchError((err => {
        return throwError(err);
      }))
    );
  }
  signup(user: User) {
    return this.https.post(AppComponent.API_URL + '/authentication/register', user)
      .toPromise().then((response: Response) => response);
  }

  resetPassword(mail: string) {
    return this.https.post(AppComponent.API_URL + '/account/resetPassword', mail)
      .toPromise().then((response: Response) => response)
      .catch(error => {
      });
  }

  getAllUsers(): Observable<any> {
    return this.https.get<User[]>(AppComponent.API_URL + '/account/accounts').pipe(
      map((response: any) => response),
      catchError((err => {
        return throwError(err);
      }))
    );
  }

  getAllInstitutions(): Observable<any> {
    return this.https.get(AppComponent.API_URL + '/account/institutions').pipe(
      map((response: any) => response),
      catchError((err => {
        return throwError(err);
      }))
    );
  }

  // This function is used for updating user data
  updateAccount(user: User) {
    return this.https.post(AppComponent.API_URL + '/account/edit', user)
      .toPromise().then((response: Response) => response)
      .catch(error => {
        return throwError(error);
      });

  }

  removeAccount(id: number) {
    return this.https
      .post(AppComponent.API_URL + '/account/delete/', id)
      .toPromise().then((response: Response) => response)
      .catch(error => {
        return throwError(error);
      });
  }

  switchState(id: string) {
    return this.https.patch(AppComponent.API_URL + '/account/switchState', id)
      .toPromise().then((response: Response) => response)
      .catch(error => {
        return throwError(error);
      });
  }

  logout() {
    return this.https.get(AppComponent.API_URL + '/account/logout')
      .toPromise().then((response: Response) => response)
      .catch(error => {
        return throwError(error);
      });
  }

  getRole(): Observable<any> {
    return this.https.get(AppComponent.API_URL + '/account/institutions')
      .pipe(
        map((response: any) => response),
        catchError((err => {
          return throwError(err);
        }))
      );
  }

}
