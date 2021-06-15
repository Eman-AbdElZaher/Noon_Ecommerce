import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { off } from 'process';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import {tap} from 'rxjs/operators';
import { IOffer } from '../models/Classes/offer';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  _url="http://localhost:61135/api/Offer";
  addNewOffer(offer:IOffer): Observable<IOffer> {
    let url = `http://localhost:61135/api/Offer/CreateOffer`;
    return this.http.post<IOffer>(url, offer)
      .pipe(
     tap(() =>  {​​​​​​​​
     this._refreshNeeded$.next();
             }​​​​​​​​)
           ) 
    }
    getAllOffer():Observable<IOffer[]>
    {
      return this.http.get<IOffer[]>(this._url).pipe(catchError((err)=>
      {
        return throwError(err.message ||"Server Has Error Plz Try Again");
      }));
    }
    getOfferById(id: number): Observable<IOffer> {
      let url = `http://localhost:61135/api/Offer/${id}`;
      return this.http.get<IOffer>(url).pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }));
    }
    updateOffer(id: number, offerToUpdate: IOffer): Observable<IOffer>
     {
      let url = `http://localhost:61135/api/Offer/${id}`;
      return this.http.put<IOffer>(url, offerToUpdate)
        .pipe(catchError((err) => {
          return throwError(err.message || "Internal Server error contact site adminstarator");
        }
        ));
     }
     deleteOffer(id: number): Observable<any> {
      let url = `http://localhost:61135/api/Offer/${id}`;
      return this.http.delete<any>(url).pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");      
      }));
    }
    getOfferCount():Observable<number>{
      let url = `http://localhost:61135/api/Offer/count`;
      return this.http.get<number>(url).pipe(catchError((err)=>
      {
        return throwError(err.message ||"Internal Server error contact site adminstarator");
      }));
    }
    getOfferByPage(pageSize:number, pageNumber:number):Observable<IOffer[]>{
      let url = `http://localhost:61135/api/Offer/${pageSize}/${pageNumber}`;
      return this.http.get<IOffer[]>(url).pipe(catchError((err)=>
      {
        return throwError(err.message ||"Internal Server error contact site adminstarator");
      }));
    }
   
}
