import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAdvertisement } from 'src/app/models/Interfaces/IAdvertisement';
import{AdvertisementService} from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  advertisement=new IAdvertisement (0,'','','');
  //errorMsg="";
  AdvertisementList:IAdvertisement[]=[];
  hasAdvertisements:boolean=false;
  constructor(private AdvertisementService:AdvertisementService) { }

  ngOnInit(): void {
    this.AdvertisementService.refreshNeeded$.subscribe(()=>{
      this.GetAllAdvertisements();
    })
    this.GetAllAdvertisements();
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
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
    }
    DeleteAdverisement(AdvertisId:number)
    {
      this.AdvertisementService.deleteAdvertisement(AdvertisId).subscribe(
        data => {
          this.advertisement=data;
        },
        error=>
        {
         this.errorMsg = error;
        }
      )
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
        },
        error=>
        {
         this.errorMsg = error;
        }
       )
      }
  }
  
  


