import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection } from '@aspnet/signalr';


import { Observable } from 'rxjs';
import { Review } from 'src/app/models/Classes/Review';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-review',
  templateUrl: './show-review.component.html',
  styleUrls: ['./show-review.component.scss']
})
export class ShowReviewComponent implements OnInit {
 public produtReviews: Review[] = [];
 @Output() reviwesNumber=new EventEmitter();

 @Input() productID:number;
 userNames:any[]=[];
 

  constructor(private userService:UserService ,private reviewservice: ReviewService, private rout:Router) {
    console.log(this.produtReviews)

  }
 
  msgerror = "";
  ngOnInit() {
    console.log("Product ID"+this.productID);
    this.reviewservice.getAllReview(this.productID).subscribe(
      data => {
        this.produtReviews = data;
        this.reviwesNumber.emit(data.length);
        data.forEach(element => {
          this.userService.getUserByid(element.userID).subscribe(
            data=>
            {
             
              let userreview={
                rev_ID:element.id,
                username:data.userName
              }
              this.userNames.push(userreview);
            }
          )
          
        });
        console.log("USSSS",this.userNames)

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
    this.rout.navigate(["/home/productPage",this.productID]);
  }

 
  editeReview(id:number)
  { 
    this.rout.navigate(["/review/edit",id]);
  }
}
