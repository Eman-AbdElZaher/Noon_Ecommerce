import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  review=new Review(0,"","",2,"a03fce4b-a211-4abb-8b41-9f89a467968d");
  isChecked=false;
 
  
  constructor(private reviewservice:ReviewService) { 
    
  }
  

  ngOnInit(): void {
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
      },
      errorrespone=>
      {
        console.log(errorrespone);
      }
    )
  }

}
