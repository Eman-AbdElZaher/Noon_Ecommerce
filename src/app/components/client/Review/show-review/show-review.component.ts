import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.scss']
})
export class ShowReviewComponent implements OnInit {
 public produtReviews: Review[] = [];

  constructor(private reviewservice: ReviewService, private rout:Router) {
    console.log(this.produtReviews)

  }
 
  msgerror = "";
  ngOnInit() {
    this.reviewservice.getAllReview(2).subscribe(
      data => {
        this.produtReviews = data;
        console.log(data);
        console.log(this.produtReviews)

      },
      error => {
        this.msgerror = error;

      }


    )

  }

  deleteReview(id:number)
  {
    this.reviewservice.deleteReview(id).subscribe(
      error=>
      {
        return error;
        
      }
    )
    this.ngOnInit();
  }

 
  editeReview(id:number)
  { 
    this.rout.navigate(["/review/edit",id]);
  }
}
