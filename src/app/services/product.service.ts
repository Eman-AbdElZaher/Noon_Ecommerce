import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import { Ibrand } from '../models/Classes/Brand';
import { IProduct } from '../models/Interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _url="http://localhost:61135/api/Product";

  private _refreshNeeded$ = new Subject<void>();
 
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private http: HttpClient) { }
  addNewProduct(product:IProduct): Observable<IProduct> {
    let url = `http://localhost:61135/api/Product/CreateProduct`;
    return this.http.post<IProduct>(url, product)
      .pipe(
     tap(() =>  {​​​​​​​​
     this._refreshNeeded$.next();
             }​​​​​​​​)
           )  
    }
  getAllProduct():Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getProductById(id: number): Observable<IProduct> {
    let url = `http://localhost:61135/api/Product/${id}`;
    return this.http.get<IProduct>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
  updateProduct(id: number, productToUpdate: IProduct): Observable<IProduct>
   {
    let url = `http://localhost:61135/api/Product/${id}`;
    return this.http.put<IProduct>(url, productToUpdate)
      .pipe(catchError((err) => {
        return throwError(err.message || "Internal Server error contact site adminstarator");
      }
      ));
   }
   deleteProduct(id: number): Observable<any> {
    let url = `http://localhost:61135/api/Product/${id}`;
    return this.http.delete<any>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
      
    }));
  }
  getAllBrands():Observable<Ibrand[]>
  {
    return this.http.get<Ibrand[]>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
 
}
