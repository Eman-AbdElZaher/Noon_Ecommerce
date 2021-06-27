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
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { MaincategorydetailsComponent } from '../maincategorydetails/maincategorydetails.component';
import { ProductofferComponent } from '../productoffer/productoffer.component';
import { SearchPoductsComponent } from '../search-poducts/search-poducts.component';
const routes:Routes=[ 
  {path:'offers',component:OffersComponent},
  {path:'producthome',component:ProductshomeComponent},
  {path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
  {path:'maincategory',component:MaincategorydetailsComponent},
  {path:'productoffer/:subcategoryid/:offervalue',component:ProductofferComponent},
  {path:'SearchProduct/:searchKeyProduct',component:SearchPoductsComponent}
];
@NgModule({
  declarations: [
    ProductshomeComponent,
    OffersComponent,
    CarouselComponent,
    ShowsubcategoryComponent,
    ProfileComponent,
    MaincategorydetailsComponent,
    ProductofferComponent,
    SearchPoductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  exports:[
    CarouselComponent,
    ShowsubcategoryComponent,
    ProductshomeComponent,
   OffersComponent
  ]
})
export class ClientModule { }
