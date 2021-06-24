import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  review=new Review(0,"","",2,"5025ae85-b5f2-432a-8573-4667b7ce7e11");
  review_r=new Review(0,"","",0,"");
  isChecked=false;
  private _hubConnection: HubConnection;
  showimage:boolean=false;
  constructor(private reviewservice:ReviewService) { 
    
  }
  ngOnInit(): void {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:61135/review').build();
    this._hubConnection.start()
    .then(()=>
    console.log('connection start'))
    .catch(err=>{
      console.log('Error while establishing the connection')
    });
  }
  Checked(checked)
  {
    this.isChecked=checked;
  }
  errorMsg='';
  writeComment()
  {
    console.log(this.review);
    this.reviewservice.postReview(this.review).subscribe(
      reviewdata=>
      {
        console.log(reviewdata);      
        this._hubConnection.on('BroadcastMessage', (message)=>{     
          this.review_r=message;     
        this.showimage=true;
        this.ngOnInit();
       })
      },
      errorrespone=>
      {
        console.log(errorrespone);
      }
    )
  }
 
}
