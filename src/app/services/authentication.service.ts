import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiController } from '../controller/ApiController';
import { ILogin } from '../models/Interfaces/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Accept': '*/*'
    })
  }
  constructor(private _http:HttpClient) { }
  login(credentials:ILogin):Observable<any>
   {
     const body={
      email: credentials.email,
      password: credentials.password,
      grant_type:'password'
    }
    return this._http.post(`${ApiController.Account_URL}`,body)
    .pipe(map(res => {
      console.log(res);
      this.saveToken(res);
  }));
   }
   private saveToken(authResult) {
    const expiresAt = authResult.expiration;
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
}  
}