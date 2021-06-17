import { HttpClient } from '@angular/common/http';
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
  getUserByid(id:string):Observable<Iuser>
  {
    return this.http.get<Iuser>(`http://localhost:61135/api/Account/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));  
  } 
}
