import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private _http:HttpClient) { }
  
  uploadImage(formData:FormData): Observable<any>{
    let uploadUrl = `${environment.API_URL}/api/UploadImage`
    return this._http.post(uploadUrl, formData).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
}
