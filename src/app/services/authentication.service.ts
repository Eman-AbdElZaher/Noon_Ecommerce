import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private _http:HttpClient,
    private router: Router,
    
    ) { }

  login(credentials:ILogin):Observable<any>
   {
     const body={
      email: credentials.email,
      password: credentials.password,
      grant_type:'password'
    }
    console.log(body);
    return this._http.post(`${ApiController.Account_URL}`,body)
    .pipe(map(res => {
      console.log(res);
      
      this.saveToken(res);
  }));
   }
   private saveToken(authResult) {
    const expiresAt = authResult.token.expiration;
    console.log(authResult);
    localStorage.setItem('token', authResult.token.token);
   localStorage.setItem("expires_at", JSON.stringify(expiresAt));
   
   }  

   logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/login/login']);
}

public isLoggedIn() {
    if(localStorage.getItem('token')){
        let token = localStorage.getItem('token');

        let jwtData = token.split('.')[1]

        let decodedJwtJsonData = window.atob(jwtData)

        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let expirationDateInMills = decodedJwtData.exp * 1000;

        let todayDateInMills = new Date().getTime();

        if (expirationDateInMills >= todayDateInMills)
            return true;
        
    }
    return false;
}

  isLoggedOut() {
      return !this.isLoggedIn();
  }
  getRole():string {
      if(localStorage.getItem('token')){
          let token = localStorage.getItem('token');

          let jwtData = token.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          let role=decodedJwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          return role;
      }
      return "No Role";
    }
    
  getUserId(){
      if(localStorage.getItem('token')){
          let token = localStorage.getItem('token');

          let jwtData = token.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          let userID=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          return userID;
      }
      return null;
  }
  getUserName(){
    if(localStorage.getItem('token')){
        let token = localStorage.getItem('token');

        let jwtData = token.split('.')[1]

        let decodedJwtJsonData = window.atob(jwtData)

        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        let name=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        return name;
    }
    return null;
}
 getUserEmail(){
  if(localStorage.getItem('token')){
    let token = localStorage.getItem('token');

    let jwtData = token.split('.')[1]

    let decodedJwtJsonData = window.atob(jwtData)

    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let email=decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    return email;
}
return null;
 }

}