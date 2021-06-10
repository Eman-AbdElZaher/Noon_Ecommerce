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

  review=new Review(0,"","",2,"e2622172-be88-4483-8585-6649a8f956c2");
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
