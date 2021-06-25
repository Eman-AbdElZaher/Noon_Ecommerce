import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAdvertisement } from 'src/app/models/Interfaces/IAdvertisement';
import{AdvertisementService} from 'src/app/services/advertisement.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
declare var $:any
@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  advertisement=new IAdvertisement (0,'','','');
  //errorMsg="";
  imageFile!: File;
  AdvertisementList:IAdvertisement[]=[];
  hasAdvertisements:boolean=false;
  advertisementCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  updateAdvertisementClicked: boolean=false;
  isLoading:boolean=true;
  constructor(
    private AdvertisementService:AdvertisementService,
    private _uploadImageService:UploadImageService) { }

  ngOnInit(): void {
    // this.AdvertisementService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllAdvertisements();
    // })
    // this.GetAllAdvertisements();
    this.getAdvertisementCount();
    this.getSelectedPage(1);

    this.reserform();
  }
  init(){
    this.getAdvertisementCount();
    this.getSelectedPage(this.currentPageNumber);
    this.reserform();
  }
  GetAllAdvertisements(){
    this.AdvertisementService.getAllAdvertisement().subscribe(
      serviceData=>
      {
        if(serviceData.length > 0)
        {
           this.AdvertisementList=serviceData;
           this.hasAdvertisements=true;
        }
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  
    reserform(form? : NgForm){
      if(form !=null)
        form.reset();
      this.advertisement= {
        id:0,
        image:'',
        startDate:'',
        endDate:''
      }
    }
    errorMsg='';
    AddnewAdvertisement(form : NgForm)
    {
       this.AdvertisementService.addNewAdvertisement(this.advertisement).subscribe(
        data => {
          this.advertisement=data;
          this.init();
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
    }
    DeleteAdverisement(AdvertisId:number)
    {
      if (confirm("Are you sure you want to delete this Advertisement ?")) {
        this.AdvertisementService.deleteAdvertisement(AdvertisId).subscribe(
          data => {
            this.advertisement=data;
            this.init();
          },
          error=>
          {
           this.errorMsg = error;
          }
        )
      }
    }
    EditAdverisement(AdverisementId:number,adverisement:IAdvertisement)
    {
      this.AdvertisementService.updateAdvertisement(AdverisementId,adverisement).subscribe(
        data => {
          this.advertisement=data;
        },
        error=>
        {
         this.errorMsg = error;
        }
      )
    }
    SaveEditAdvertisement(form : NgForm)
    {
       this.AdvertisementService.updateAdvertisement(this.advertisement.id,this.advertisement).subscribe(
        data => {
          this.advertisement=data;
          this.init();
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
      }
      private getAdvertisementCount(){
        this.AdvertisementService.getAdvertisementCount().subscribe(
          data => {
            this.advertisementCount = data;
            console.log(this.advertisementCount)
            this.numberOfPages = Math.ceil(this.advertisementCount / this.pageSize);
            console.log(this.numberOfPages);
          },
          error=>
          {
           this.errorMsg = error;
          }
        ) 
      }
      // pagination
      counter(i: number) {
        return new Array(i);
      }
      getSelectedPage(currentPageNumber:number){
        this.AdvertisementService.getAdvertisementByPage(this.pageSize,currentPageNumber).subscribe(
          data => {
            this.AdvertisementList= data;
            this.currentPageNumber = currentPageNumber;
            console.log(this.currentPageNumber);
            this.isLoading=false;
            if(data.length != 0)
              this.hasAdvertisements = true;
            else
              this.hasAdvertisements = false;
      
          },
          error=>
          {
           this.errorMsg = error;
          }
        ) 
      }
      uploadFile() {
        const formDate = new FormData();
        formDate.append("file", this.imageFile, this.imageFile.name);
        this._uploadImageService.uploadImage(formDate).subscribe(
          data => {
           this.advertisement.image=this.imageFile.name;
          },
          error => {
            console.log(error)
          }
        );
      }
      onFileChange(event: any) {
        if (event.target.files.length > 0) {
          this.imageFile = event.target.files[0];
          this.uploadFile();
        }
      }
  }
  
  


