import { Injectable } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
  HttpEvent,
} from "@angular/common/http";
import { SnackbarService } from "../notifications/toaster/snackbar.service";
import { Profile } from "src/app/models/profile.model";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(
    private https: HttpClient,
    private toasterService: SnackbarService
  ) {}
  message: string = "";
  progress: number = 0;
  getProfile(pseudoname: string): Observable<any> {
    return this.https
      .get(
        AppComponent.API_URL +
          "/gmartws-core-profile/find-profile/" +
          pseudoname
      )
      .pipe(
        map((response: any) => response),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getMyProfile(): Observable<any> {
    return this.https
      .get(AppComponent.API_URL + "/gmartws-core-profile/find-my-profile")
      .pipe(
        map((response: any) => response),
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  updateProfilePicture(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    return this.https
      .post(
        AppComponent.API_URL + "/gmartws-core-profile/update-profile-picture",
        formData
      )
      .pipe(
        map((response: any) => response),
        catchError((err) => {
          this.progress = 0;
          console.log(err);
          this.toasterService.message = JSON.stringify(err);
          this.toasterService.open();
          return throwError(err);
        })
      );
  }

  updateProfileCover(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    return this.https
      .post(
        AppComponent.API_URL + "/gmartws-core-profile/update-profile-cover",
        formData
      )
      .pipe(
        map((response: any) => response),
        catchError((err) => {
          this.progress = 0;
          console.log(err);
          this.toasterService.message = JSON.stringify(err);
          this.toasterService.open();
          return throwError(err);
        })
      );
  }
}
