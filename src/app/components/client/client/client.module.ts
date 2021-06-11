import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductshomeComponent } from '../productshome/productshome.component';
import { OffersComponent } from '../offers/offers.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ShowsubcategoryComponent } from '../showsubcategory/showsubcategory.component';
import { OwlModule } from 'ngx-owl-carousel';
import { ProductDetailsComponent } from '../product-details/product-details.component';
const routes:Routes=[ 
  {path:'offers',component:OffersComponent},
  {path:'producthome',component:ProductshomeComponent},

];
@NgModule({
  declarations: [
    ProductshomeComponent,
    OffersComponent,
    CarouselComponent,
    ShowsubcategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    OwlModule
  ],
  exports:[
    CarouselComponent,
    ShowsubcategoryComponent,
    ProductshomeComponent,
   OffersComponent
  ]
})
export class ClientModule { }
