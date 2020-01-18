import { Injectable } from '@angular/core';
import { Datasource } from 'src/app/models/datasource.model';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
import { Observable, throwError } from 'rxjs';
import 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DsService {

  constructor(private https: HttpClient) { }
  
  testConnection(ds: Datasource) {
    return this.https.post(AppComponent.API_URL + '/datasource/test/connection', ds)
      .toPromise().then((response: Response) => response);
  }
  
}
