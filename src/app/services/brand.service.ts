import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Ibrand } from '../models/Classes/Brand';
import {catchError} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  _url="http://localhost:61135/api/Brands";
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewBrand(brand:Ibrand): Observable<Ibrand> {
    return this.http.post<Ibrand>(this._url, brand)
      .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      )
    }
  getAllBrands():Observable<Ibrand[]>
  {
    return this.http.get<Ibrand[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getBrandById(id: number): Observable<Ibrand> {
    let url = `http://localhost:61135/api/Brands/${id}`;
    return this.http.get<Ibrand>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  updateBrand(id: number, brandToUpdate: Ibrand): Observable<Ibrand>
   {
    const headers = {'content-type': 'application/json'}  
    let url = `http://localhost:61135/api/Brands/${id}`;
    return this.http.put<Ibrand>(url, brandToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteBrand(id: number): Observable<any> {
    let url = `http://localhost:61135/api/Brands/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  getBrandsCount():Observable<number>{
    let url = `http://localhost:61135/api/Brands/count`;
    return this.http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getBrandByPage(pageSize:number, pageNumber:number):Observable<Ibrand[]>{
    let url = `http://localhost:61135/api/Brands/${pageSize}/${pageNumber}`;
    return this.http.get<Ibrand[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

}
