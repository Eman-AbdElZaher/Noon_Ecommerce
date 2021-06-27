import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent implements OnInit {
  reviewId:number;
  public reviewe:Review={id:0,comment:"",productID:0,rating:0,userID:""};
  errormsg="";
  constructor(private activatedRoute:ActivatedRoute,private reviweSrvice:ReviewService,private rout:Router) { }

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
  setRating(rating:number)
  {
    this.reviewe.rating=rating;
  }
  updateReview()
  {
    
    this.reviweSrvice.updateReview(this.reviewe.id,this.reviewe).subscribe(

    error=>
    {
      console.log(error);
      
    }
      
    )
    this.rout.navigate(["/home/productPage",this.reviewe.productID]);
  }



}
