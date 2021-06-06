import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from '../models/Classes/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 
  constructor(private http:HttpClient) { }

  postReview(review:Review):Observable<Review>
  {
    let  _url='http://localhost:61135/api/Reviews';
    return this.http.post<Review>(_url,review).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message|| "Internal Server error contact site adminstarator");
        }
      )
    )
  }

  getAllReview(productid:number):Observable<Review[]>
  {
    let url=`http://localhost:61135/api/Reviews?productid=${productid}`;
    return this.http.get<Review[]>(url).pipe
    (
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
        )
      )
    
  }
  getReviewById(reviewId:number):Observable<Review>
  {
    let url=`http://localhost:61135/api/Reviews/${reviewId}`;

    return this.http.get<Review>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }
  updateReview(reviewId:number,updateedReview:Review):Observable<Review>
  {
    let url= `http://localhost:61135/api/Reviews/${reviewId}`;
    return this.http.put<Review>(url,updateedReview).pipe(
      catchError(
        (err)=>
        {
          return throwError(err.message);
        }
      )
    )
  }

  deleteReview(reviewId:number):Observable<Review>
  {
    let url= `http://localhost:61135/api/Reviews/${reviewId}`;
    return this.http.delete<Review>(url).pipe(
      catchError(
      (err)=>
      {
        return throwError(err.message);
      }
      )
    )
  }
}
