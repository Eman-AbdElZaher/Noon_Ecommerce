import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent implements OnInit {
  reviewId:number;
  reviewe:Review;
  errormsg="";
  constructor(private activatedRoute:ActivatedRoute,private reviweSrvice:ReviewService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.reviewId=parseInt(params.get('id'));
    })

    this.reviweSrvice.getReviewById(this.reviewId).subscribe(
      data=>
      {
        this.reviewe=data;
      },
      error=>
      {
        this.errormsg=error;
      }
    )
  }

  updateComment()
  {}



}
