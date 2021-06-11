import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './create-review/create-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { ShowReviewComponent } from './show-review/show-review.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'create',component:CreateReviewComponent},
  {path:'show',component:ShowReviewComponent},
  {path:'edit/:id',component:UpdateReviewComponent},
    
]
@NgModule({
  declarations: [
    CreateReviewComponent,
    UpdateReviewComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    
  ]
})
export class ReviewModule { }
