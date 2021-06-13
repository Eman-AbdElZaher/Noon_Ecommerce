import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartProduct } from '../models/Classes/CartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  constructor(private http: HttpClient) { }

  addCartProduct(productId: number) {
    console.log(productId);
    // const token=localStorage.getItem('token');
    // const headers = { 'Authorization': `Bearer ${token}` };
    // const token={headers:new HttpHeaders(
    //   {"Authorization":"Bearer "+localStorage.getItem('token')})};
    let url =`http://localhost:61135/api/CartProducts?productid=${productId}`;
    return this.http.post(url,"",{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('token')})}).pipe(
      catchError(
        (err) => {
          return throwError(err.message);
        }
      )
      )
  }

  getAllCartProduct(cartId:string):Observable<CartProduct[]>
  {
    console.log(cartId);
    let url=`http://localhost:61135/api/CartProducts?cartId=${cartId}`;
    return this.http.get<CartProduct[]>(url,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('token')})}).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      ) 
    )
  }

  getCartProductById(productId:number):Observable<CartProduct>
  {
    let url=`http://localhost:61135/api/CartProducts/${productId}`;
    return this.http.get<CartProduct>(url,{headers:new HttpHeaders(
      {"Authorization":"Bearer "+localStorage.getItem('token')})}).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }

  deleteCartProduct(productId:number):Observable<CartProduct>
  {
    let url= `http://localhost:61135/api/CartProducts/${productId}`;
    return this.http.delete<CartProduct>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }
}
