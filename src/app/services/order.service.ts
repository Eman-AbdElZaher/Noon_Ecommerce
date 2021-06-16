import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import{Order} from 'src/app/models/Classes/Order';
import{OrderDetails} from 'src/app/models/Classes/OrderDetails';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  _url="http://localhost:61135/api/Order";
  Url="http://localhost:61135/api/Order/Checkout";

  private _refreshNeeded$ = new Subject<void>();
 
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) { }
  getAllOrders():Observable<Order[]>
  {
    return this.http.get<Order []>(this._url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));
  }
  
  getAllOrderDetailsByOrderID(id:number):Observable<OrderDetails[]>
  {
    return this.http.get<OrderDetails[]>(`http://localhost:61135/api/Order/GetOrderDetails?id=${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));  
  }
  getOrderbyID(id:number):Observable<Order>
  {
    return this.http.get<Order>(`http://localhost:61135/api/Order/${id}`).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));  
  }
  CheckoutOrder()
  {
    return this.http.get(this.Url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Server Has Error Plz Try Again");
    }));  
  }
}
  

