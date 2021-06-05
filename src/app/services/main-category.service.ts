import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMainCategory } from '../models/Interfaces/IMainCategory';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService {

  constructor(
    private _http:HttpClient
  ) { }
  getAllCategories():Observable<IMainCategory[]> {
    let url = `${environment.API_URL}/api/category`;
    return this._http.get<IMainCategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getMainCategoryById(id:number):Observable<IMainCategory>{
    let url = `${environment.API_URL}/api/category/${id}`;
    return this._http.get<IMainCategory>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  addNewMainCategory(newCategory:IMainCategory):Observable<IMainCategory>{
    let url = `${environment.API_URL}/api/category`;
    return this._http.post<IMainCategory>(url, newCategory)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  updateMainCategory(id:number, categoryToUpdate:IMainCategory):Observable<IMainCategory>{
    let url = `${environment.API_URL}/api/category/${id}`;
    return this._http.put<IMainCategory>(url, categoryToUpdate)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  deleteMainCategory(id:number):Observable<any>{
    let url = `${environment.API_URL}/api/category/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getMainCategoriesCount():Observable<number>{
    let url = `${environment.API_URL}/api/category/count`;
    return this._http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCategoriesByPage(pageSize:number, pageNumber:number):Observable<IMainCategory[]>{
    let url = `${environment.API_URL}/api/category/${pageSize}/${pageNumber}`;
    return this._http.get<IMainCategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
