import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {tap} from 'rxjs/operators';
import { Ibrand } from '../models/Classes/Brand';
import { Product } from '../models/Classes/Product';
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
  getProductById(id: number): Observable< Product> {
    let url = `http://localhost:61135/api/Product/${id}`;
    return this.http.get<Product>(url).pipe(catchError((err) => {
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
  getProductsCount():Observable<number>{
    let url = `http://localhost:61135/api/Product/count`;
    return this.http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getAllProductBySubCategoryId(id:number): Observable<IProduct[]> {
    let url = `http://localhost:61135/api/Product/AllProductBySubCategoryId?id=${id}`;
    return this.http.get<IProduct[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    })
    )}
  getProductByPage(pageSize:number, pageNumber:number):Observable<IProduct[]>{
    let url = `http://localhost:61135/api/Product/${pageSize}/${pageNumber}`;
    return this.http.get<IProduct[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getAllProductsDevices()
  {
    let _url="http://localhost:61135/api/Product/AllProductDevices";
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getAllProductinSubCategoryBetweenTwoprice(id:number,minprice:any,maxprice:any):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/AllProductsBetweenTwoPrice?id=${id}&min_price=${minprice}&max_price=${maxprice}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInSpacificBrand(subcategoryId:number,brandId:number):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/AllProductsInAspecificBrand?subcategoryid=${subcategoryId}&brandid=${brandId}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInSpacificSize(subcategoryId:number,size:any):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductfilteredBySize?subcategoryid=${subcategoryId}&size=${size}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInBrand(brandId:number):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductFilteredByBrandID?id=${brandId}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInSize(size:any):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductFilteredBySizeonly?size=${size}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInColor(color:string):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductFilteredByColor?color=${color}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInTwoPrice(minprice:any,maxprice:any):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductFilteredByPrice?min_price=${minprice}&max_price=${maxprice}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }

  getAllProductInSupplier(supplierId:number):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductFilteredBySupplier?supplierId=${supplierId}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
   getAllProductCountInSubCategory(subCategoryId:number):Observable<IProduct[]>
  {
    let _url=`http://localhost:61135/api/Product/GetAllProductCountinSubCategory?id=${subCategoryId}`;
    return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  getNewArrivalProduct(number:number):Observable<IProduct[]>
  {
     let _url=`http://localhost:61135/api/Product/LatestArrivals/${number}`
     return this.http.get<IProduct[]>(_url).pipe(catchError((err)=>
     {
       return throwError(err.message ||"Server Has Error Plz Try Again");
     }));
  }
  // getAllProductInSpacificSupplier(subCategoryId:number,SupplierId)
  // {

  // }
}
