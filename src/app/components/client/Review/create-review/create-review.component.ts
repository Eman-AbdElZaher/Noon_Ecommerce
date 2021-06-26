import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Review } from 'src/app/models/Classes/Review';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  userID:string="";
  @Input() productID:number=0;
  public review:Review;
  review_r=new Review(0,"",0,0,"");
  isChecked=false;
  private _hubConnection: HubConnection;
  showimage:boolean=false;
 
  constructor(private reviewservice:ReviewService,private AuthService:AuthenticationService,private rout:Router ) { 
    
  }
  ngOnInit(): void {
    this.userID=this.AuthService.getUserId();

    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:61135/review').build();
    this._hubConnection.start()
    .then(()=>
    console.log('connection start'))
    .catch(err=>{
      console.log('Error while establishing the connection')
    });
    this.review= new Review(0,"",0,this.productID,this.userID);
  }

  setRating(rating:number)
  {
    this.review.rating=rating;
  }
  errorMsg='';
  writeComment()
  {
    console.log(this.review);
    this.reviewservice.postReview(this.review).subscribe(
      reviewdata=>
      {
        console.log(reviewdata);  
        this.rout.navigate(["/home/productPage",this.productID]);    
        this._hubConnection.on('BroadcastMessage', (message)=>{     
          this.review_r=message;     
        this.showimage=true;
       
       })
      },
      errorrespone=>
      {
        console.log(errorrespone);
      }
    )
   
  }
 
}
