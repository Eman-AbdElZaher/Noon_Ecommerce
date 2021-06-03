import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Ibrand } from '../models/Classes/Brand';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  _url="http://localhost:61135/api/Brands";
  constructor(private http: HttpClient) { }
  addNewBrand(brand:Ibrand): Observable<Ibrand> {
    let url = `http://localhost:61135/api/Brands`;
    return this.http.post<Ibrand>(url, brand)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
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

}
