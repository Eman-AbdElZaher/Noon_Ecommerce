import { HttpEventType, HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @ViewChild('Imagetitle') title: ElementRef;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let uploadUrl = `${environment.API_URL}/api/UploadImage`
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    this.title.nativeElement.value = fileToUpload.name;
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(uploadUrl, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
           this.title.nativeElement.classList.Add('uploadedCompleted');
        }
       else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
  


}
