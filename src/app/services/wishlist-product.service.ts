import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { wishListProduct } from '../models/Classes/whishListProduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistProductService {

  constructor(private http:HttpClient) { }

  getAllWishlistProduct(whishlistID:string):Observable<wishListProduct[]>
  {
    let url=`http://localhost:61135/api/WishListProducts?wishlistId=${whishlistID}`;
    return this.http.get<wishListProduct[]>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }

  addWishlistProduct(productID:number):Observable<wishListProduct>
  {
    let url =`http://localhost:61135/api/WishListProducts?id=${productID}`;
    return this.http.post<wishListProduct>(url,productID).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    ) 
  }

  getWishlistProductById(productId:number):Observable<wishListProduct>
  {
    let url=`http://localhost:61135/api/WishListProducts/${productId}`;
    return this.http.get<wishListProduct>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }

  deleteWishlistProduct(productId:number):Observable<wishListProduct>
  {
    let url= `http://localhost:61135/api/WishListProducts/${productId}`;
    return this.http.delete<wishListProduct>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }
}
