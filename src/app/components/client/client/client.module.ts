import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductshomeComponent } from '../productshome/productshome.component';
import { OffersComponent } from '../offers/offers.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ShowsubcategoryComponent } from '../showsubcategory/showsubcategory.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubcategoryproductComponent } from '../subcategoryproduct/subcategoryproduct.component';
const routes:Routes=[ 
  {path:'offers',component:OffersComponent},
  {path:'producthome',component:ProductshomeComponent},
  {path:'subcategoryProduct',component:SubcategoryproductComponent}

];
@NgModule({
  declarations: [
    ProductshomeComponent,
    OffersComponent,
    CarouselComponent,
    ShowsubcategoryComponent,
    SubcategoryproductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule
    
  ],
  exports:[
    CarouselComponent,
    ShowsubcategoryComponent,
    ProductshomeComponent,
   OffersComponent
  ]
})
export class ClientModule { }
