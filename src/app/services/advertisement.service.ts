import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{IAdvertisement} from 'src/app/models/Interfaces/IAdvertisement';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  _url="http://localhost:61135/api/Advertisements";

  private _refreshNeeded$ = new Subject<void>();
 
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewAdvertisement(advertisement:IAdvertisement): Observable<IAdvertisement> {
    let url = `http://localhost:61135/api/Advertisements`;
    return this.http.post<IAdvertisement>(url, advertisement)
      .pipe(
     tap(() =>  {​​​​​​​​
     this._refreshNeeded$.next();
             }​​​​​​​​)
           )
    }
  getAllAdvertisement():Observable<IAdvertisement[]>
  {
    return this.http.get<IAdvertisement []>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getSupplierById(id: number): Observable<IAdvertisement> {
    let url = `http://localhost:61135/api/Advertisements/${id}`;
    return this.http.get<IAdvertisement>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  updateAdvertisement(id:number, AdvertisToUpdate:IAdvertisement):Observable<IAdvertisement>
   {
    let url = `http://localhost:61135/api/Advertisements/${id}`;
    return this.http.put<IAdvertisement>(url, AdvertisToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteAdvertisement(id: number): Observable<any> {
    let url = `http://localhost:61135/api/Advertisements/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
      
    }));
  }
  getAdvertisementCount():Observable<number>{
    let url = `http://localhost:61135/api/Advertisements/count`;
    return this.http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getAdvertisementByPage(pageSize:number, pageNumber:number):Observable<IAdvertisement[]>{
    let url = `http://localhost:61135/api/Advertisements/${pageSize}/${pageNumber}`;
    return this.http.get<IAdvertisement[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
 
}
