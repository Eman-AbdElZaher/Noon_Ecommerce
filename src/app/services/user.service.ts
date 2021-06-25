import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iuser } from '../models/Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url="http://localhost:61135/Register";
  constructor(private http: HttpClient) { }
  registerUser(user:Iuser)
  {
    return this.http.post(this._url,user);
  }
  registerAdmin(user:Iuser)
  {
    let url="http://localhost:61135/api/Account/AdminRegister";
    return this.http.post(url,user,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('token')})}).pipe(
      catchError(
        (err) => {
          return throwError(err.message);
        }
      )
      )
  }
  getUserByid(id:string):Observable<Iuser>
  {
    return this.http.get<Iuser>(`http://localhost:61135/api/Account/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));  
  }
  getUserName(id:string) 
  {
    return this.http.get(`http://localhost:61135/api/Account/GetUserName/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));  
  }  
}
