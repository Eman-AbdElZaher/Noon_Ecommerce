import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IOffer } from 'src/app/models/Classes/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  offer=new IOffer(0,'','',0);
  constructor(private offerService:OfferService) { }
  offerList:IOffer[]=[];
  ngOnInit(): void {
    this.offerService.refreshNeeded$.subscribe(()=>{
      this.GetAllOffer()
    })
    this.GetAllOffer();
    this.reserform();
  }
  errorMsg='';
  GetAllOffer(){
    this.offerService.getAllOffer().subscribe(
      serviceData=>
      {
        this.offerList=serviceData;
        console.log(this.offerList);
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  reserform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.offer= {
      id:0,
      startdate:'',
      enddate:'',
      offervalue:0
    }
  }
  AddnewOffer(form : NgForm)
  {
     this.offerService.addNewOffer(this.offer).subscribe(
      data => {
        this.offer=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  DeleteOffer(offerId:number)
  {
    this.offerService.deleteOffer(offerId).subscribe(
      data => {
        this.offer=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  EditOffer(offerId:number,offer:IOffer)
  {
    this.offerService.updateOffer(offerId,offer).subscribe(
      data => {
        this.offer=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  SaveEditOffer(form : NgForm)
  {
     this.offerService.updateOffer(this.offer.id,this.offer).subscribe(
      data => {
        this.offer=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
}
