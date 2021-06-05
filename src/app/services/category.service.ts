import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/Interfaces/ICategory';
import { Observable, throwError } from 'rxjs';
import { ApiController } from '../controller/ApiController';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http:HttpClient
  ) { }
  getAllCategories():Observable<ICategory[]> {
    let url = `${ApiController.Category_URL}`;
    return this._http.get<ICategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCategoryById(id:number):Observable<ICategory>{
    let url = `${ApiController.Category_URL}/${id}`;
    return this._http.get<ICategory>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  addNewCategory(newCategory:ICategory):Observable<ICategory>{
    let url = `${ApiController.Category_URL}`;
    return this._http.post<ICategory>(url, newCategory)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  updateCategory(id:number, categoryToUpdate:ICategory):Observable<ICategory>{
    let url = `${ApiController.Category_URL}/${id}`;
    return this._http.put<ICategory>(url, categoryToUpdate)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  deleteCategory(id:number):Observable<any>{
    let url = `${ApiController.Category_URL}/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCategoriesCount():Observable<number>{
    let url = `${ApiController.Category_URL}/count`;
    return this._http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getCategoriesByPage(pageSize:number, pageNumber:number):Observable<ICategory[]>{
    let url = `${ApiController.Category_URL}/${pageSize}/${pageNumber}`;
    return this._http.get<ICategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
