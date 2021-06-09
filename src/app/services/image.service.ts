import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import { IImage } from '../models/Interfaces/IImage';
import { IProduct } from '../models/Interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  _url="http://localhost:61135/api/Images";

  private _refreshNeeded$ = new Subject<void>();
 
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewImage(image:IImage): Observable<IImage> {
    let url = `http://localhost:61135/api/Images`;
    return this.http.post<IImage>(url, image)
      .pipe(
     tap(() =>  {​​​​​​​​
     this._refreshNeeded$.next();
             }​​​​​​​​)
           )
     
     
    }
  getAllImages():Observable<IImage[]>
  {
    return this.http.get<IImage[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  // getSupplierById(id: number): Observable<ISupplier> {
  //   let url = `http://localhost:61135/api/Suppliers/${id}`;
  //   return this.http.get<ISupplier>(url).pipe(catchError((err) => {
  //     return throwError(err.message || "Internal Server error contact site adminstarator");
  //   }));
  // }
  updateImage(id: number, imageToUpdate: IImage): Observable<IImage>
   {
    let url = `http://localhost:61135/api/Images/${id}`;
    return this.http.put<IImage>(url, imageToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteImage(id: number): Observable<any> {
    let url = `http://localhost:61135/api/Images/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
      
    }));
  }
  getAllProduct():Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getImageProduct(id: number): Observable<IImage[]>
  {
   let url = `http://localhost:61135/api/Images/${id}`;
   return this.http.get<IImage[]>(url)
     .pipe(catchError((err) => {
       return throwError(err.message || "Internal Server error contact site adminstarator");
     }
     ));
  }
 
}

