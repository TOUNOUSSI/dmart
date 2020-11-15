import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../notifications/toaster/snackbar.service';
import { AppComponent } from 'src/app/app.component';
import { tap, catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(public https: HttpClient,private toasterService: SnackbarService) {}
  getFriends() {
    return this.https.get(AppComponent.API_URL + '/gmartws-core-friend/myfriends')
        .toPromise().then((response: Response) => response)       
   }
 
   addFriend(pseudoname:string) {
     console.log(AppComponent.API_URL + '/gmartws-core-friend/add-new-friend/'+ pseudoname)
        return this.https.get(AppComponent.API_URL + '/gmartws-core-friend/add-new-friend/'+ pseudoname)        
        .toPromise().then((response: Response) => response)       
   }


   AreWeAlreadyFriend(pseudoname:string) {
    console.log(AppComponent.API_URL + '/gmartws-core-friend/are-we-already-friends/'+ pseudoname)
       return this.https.get(AppComponent.API_URL + '/gmartws-core-friend/are-we-already-friends/'+ pseudoname)        
       .toPromise().then((response: Response) => response)       
  }

   
  }
