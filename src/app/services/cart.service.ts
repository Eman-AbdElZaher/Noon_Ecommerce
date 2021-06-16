import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from '../models/Classes/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private http:HttpClient) { }

  getCart(cartID:string):Observable<Cart>
  {
    console.log(cartID)
    let url=`http://localhost:61135/api/Cart?cartID=${cartID}`
    return this.http.get<Cart>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )

  }

  ClearCart(cartID:string)
  {
    let url=`http://localhost:61135/api/CartProducts/ClearCart?ccartID=${cartID}`
    return this.http.delete(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }
}
