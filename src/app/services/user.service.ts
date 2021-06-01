import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../models/iuser';

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
}
