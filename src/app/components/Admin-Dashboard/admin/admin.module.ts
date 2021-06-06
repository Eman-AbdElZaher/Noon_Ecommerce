import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './adminpanel/brand/brand.component';
import { OfferComponent } from './adminpanel/offer/offer.component';
import { SupplierComponent } from './adminpanel/supplier/supplier.component';

import { ProductComponent } from './adminpanel/product/product.component';
import { ImageComponent } from './adminpanel/image/image.component';
import { AdvertisementComponent } from './adminpanel/advertisement/advertisement.component';


const routes:Routes=[
  {path:'panel',component:AdminpanelComponent,
  children:[
    {path:'brand',component:BrandComponent},

    {path:'supplier',component:SupplierComponent},
    {path:'product',component:ProductComponent},
    {path:'image',component:ImageComponent},

    {path:'advertisement',component:AdvertisementComponent},

    {path:'offer',component:OfferComponent},
   


  ]
},
   {path:'',redirectTo:'',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AdminpanelComponent,
    BrandComponent,

    SupplierComponent,
    ProductComponent,
    ImageComponent,
    OfferComponent,
    SupplierComponent,
    AdvertisementComponent
    

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
     ReactiveFormsModule
  ]
})
export class AdminModule { }
