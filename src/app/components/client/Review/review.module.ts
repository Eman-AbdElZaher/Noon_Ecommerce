import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './create-review/create-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { ShowReviewComponent } from './show-review/show-review.component';



@NgModule({
  declarations: [
    CreateReviewComponent,
    UpdateReviewComponent,
    ShowReviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReviewModule { }
