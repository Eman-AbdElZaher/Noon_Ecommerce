import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{ISupplier} from 'src/app/models/Interfaces/ISupplier';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  _url="http://localhost:61135/api/Suppliers";

  private _refreshNeeded$ = new Subject<void>();
 
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewSupplier(supplier:ISupplier): Observable<ISupplier> {
    let url = `http://localhost:61135/api/Suppliers`;
    return this.http.post<ISupplier>(url, supplier)
      .pipe(
     tap(() =>  {​​​​​​​​
     this._refreshNeeded$.next();
             }​​​​​​​​)
           ) 
    }
  getAllSupplier():Observable<ISupplier[]>
  {
    return this.http.get<ISupplier[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getSupplierById(id: number): Observable<ISupplier> {
    let url = `http://localhost:61135/api/Suppliers/${id}`;
    return this.http.get<ISupplier>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  updateSupplier(id: number, supplierToUpdate: ISupplier): Observable<ISupplier>
   {
    let url = `http://localhost:61135/api/Suppliers/${id}`;
    return this.http.put<ISupplier>(url, supplierToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteSupplier(id: number): Observable<any> {
    let url = `http://localhost:61135/api/Suppliers/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
      
    }));
  }
  getSuppliersCount():Observable<number>{
    let url = `http://localhost:61135/api/Suppliers/count`;
    return this.http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getSupplierByPage(pageSize:number, pageNumber:number):Observable<ISupplier[]>{
    let url = `http://localhost:61135/api/Suppliers/${pageSize}/${pageNumber}`;
    return this.http.get<ISupplier[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
 
}
