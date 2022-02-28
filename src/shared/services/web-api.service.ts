import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { AppConst } from 'src/app/app.config';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    public us: UtilityService) {
    this.apiUrl = AppConst?.Data?.ApiUrl;
  }

  get(url: string, param?: object): Observable<any> {
    return this.http.get(this.apiUrl + url).pipe(
      delay(1000),
      map(response => this.returnResponse(response)),
      catchError((error) => {
        let errorMsg = error.message;
        if (!navigator.onLine) {
          errorMsg = "Please check your internet connections and try again!";
          this.us.callSnackBar(errorMsg);
        } else {
          this.us.callSnackBar(errorMsg);
        }
        return of(error);
      })
    );
  }

  post(url: string, param?: object): Observable<any> {
    return this.http.post(this.apiUrl + url, { Json: param }).pipe(
      delay(300),
      map((response: any) => this.returnResponse(response)),
      catchError((error) => {
        let errorMsg = error.message;
        if (!navigator.onLine) {
          errorMsg = "Please check your internet connections and try again!";
          this.us.callSnackBar(errorMsg);
        } else {
          this.us.callSnackBar(errorMsg);
        }

        return of(error);
      })
    );
  }

  private returnResponse(value: any): any {
    return value;
  }
}