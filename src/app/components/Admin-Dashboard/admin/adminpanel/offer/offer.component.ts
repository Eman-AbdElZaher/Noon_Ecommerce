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

  offer=new IOffer(0,new Date(),new Date(),0);
  constructor(private offerService:OfferService) { }
  offerList:IOffer[]=[];
  hasOffers:boolean=false;
  isLoading:boolean=true;
  OffersCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  ngOnInit(): void {
    // this.offerService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllOffer()
    // })
    // this.GetAllOffer();
    this.getOfferCount();
    this.getSelectedPage(1);
    this.reserform();
  }
  errorMsg='';
  GetAllOffer(){
    this.offerService.getAllOffer().subscribe(
      serviceData=>
      {
        if(serviceData.length>0){
          this.offerList=serviceData;
          console.log(this.offerList);
          this.hasOffers=true;
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
    this.offer= {
      id:0,
      startDate:new Date(),
      endDate:new Date(),
      offerValue:0
    }
  }
  AddnewOffer(form : NgForm)
  {
     this.offerService.addNewOffer(this.offer).subscribe(
      data => {
        this.offer=data;
        this.reserform();
        this.getOfferCount();
        this.getSelectedPage(this.currentPageNumber);
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
        this.offerService.getAllOffer().subscribe(
          offers=>
          {
            this.offerList=offers;
            console.log(offers.length);
            console.log(offers[0]);
          }
        )
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
        this.offerService.getAllOffer().subscribe(
          offers=>
          {
            this.offerList=offers;
            console.log(offers.length);
            console.log(offers[0]);
          }
        )      },
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
                this.getOfferCount();
                this.getSelectedPage(this.currentPageNumber);
                this.reserform();
              },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
    private getOfferCount(){
      this.offerService.getOfferCount().subscribe(
        data => {
          this.OffersCount = data;
          this.numberOfPages = Math.ceil(this.OffersCount / this.pageSize);
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
      this.offerService.getOfferByPage(this.pageSize,currentPageNumber).subscribe(
        data => {
          this.offerList= data;
          this.isLoading=false;
          this.currentPageNumber = currentPageNumber;
          console.log(this.currentPageNumber)
          if(data.length != 0)
            this.hasOffers = true;
          else
            this.hasOffers = false;
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }
}
