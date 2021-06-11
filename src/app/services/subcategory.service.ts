import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiController } from '../controller/ApiController';
import { catchError } from 'rxjs/operators';
import { ISubCategory } from '../models/Interfaces/ISubCategory';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  refreshNeeded$: any;

  constructor(
    private _http:HttpClient
  ) { }
  getAllSubCategories():Observable<ISubCategory[]> {
    let url = `${ApiController.SubCategory_URL}`;
    return this._http.get<ISubCategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getSubCategoryById(id:number):Observable<ISubCategory>{
    let url = `${ApiController.SubCategory_URL}/${id}`;
    return this._http.get<ISubCategory>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  addNewSubCategory(newCategory:ISubCategory):Observable<ISubCategory>{
    let url = `${ApiController.SubCategory_URL}`;
    return this._http.post<ISubCategory>(url, newCategory)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  updateSubCategory(id:number, categoryToUpdate:ISubCategory):Observable<ISubCategory>{
    let url = `${ApiController.SubCategory_URL}/${id}`;
    return this._http.put<ISubCategory>(url, categoryToUpdate)
            .pipe(catchError((err)=>{
              return throwError(err.message ||"Internal Server error contact site adminstarator");
                }
              ));
  }
  deleteSubCategory(id:number):Observable<any>{
    let url = `${ApiController.SubCategory_URL}/${id}`;
    return this._http.delete<any>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getSubCategoriesCount():Observable<number>{
    let url = `${ApiController.SubCategory_URL}/count`;
    return this._http.get<number>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  getSubCategoriesByPage(pageSize:number, pageNumber:number):Observable<ISubCategory[]>{
    let url = `${ApiController.SubCategory_URL}/${pageSize}/${pageNumber}`;
    return this._http.get<ISubCategory[]>(url).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
<<<<<<< HEAD
=======
 
  
>>>>>>> 9fe22d8322a4ec51e4fe79c8c069fd66a49cc8cf
}
