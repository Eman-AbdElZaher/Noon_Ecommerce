import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductshomeComponent } from '../productshome/productshome.component';
import { OffersComponent } from '../offers/offers.component';
const routes:Routes=[
  
  {path:'offers',component:OffersComponent}

];


@NgModule({
  declarations: [
    ProductshomeComponent,OffersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
