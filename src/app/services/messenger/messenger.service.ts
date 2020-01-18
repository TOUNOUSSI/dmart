import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../notifications/toaster/snackbar.service';
import { AppComponent } from 'src/app/app.component';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private router: Router, public https: HttpClient,private toasterService: SnackbarService) {}
  getFriends() {
    return this.https.get(AppComponent.API_URL + '/messenger/myfriends')
        .toPromise().then((response: Response) => response)       
   }
 
   addFriend(username:string) {
        return this.https.get(AppComponent.API_URL + '/messenger/add-new-friend/'+ username).pipe(
          tap((response: any) => {
            this.toasterService.message = 'Friends has been added'; 
            this.toasterService.open()
          }),catchError((err: any) => {
              this.toasterService.message = 'Cannot reach the server end-point'; 
              this.toasterService.open();
            return (err instanceof HttpErrorResponse)?   err.error: of(err);
       }));
   }

   
  }
