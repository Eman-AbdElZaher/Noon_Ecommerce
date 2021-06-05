import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.scss']
})
export class ShowReviewComponent implements OnInit {
  produtReviews:Review[]=[];
  constructor(private reviewservice:ReviewService) { }

  ngOnInit(): void {
    //this.produtReviews=this.reviewservice.getAllReview(2);
  }

 

}
