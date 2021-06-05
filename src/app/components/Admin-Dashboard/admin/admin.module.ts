import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './adminpanel/brand/brand.component';
import { OfferComponent } from './adminpanel/offer/offer.component';
import { SupplierComponent } from './adminpanel/supplier/supplier.component';

const routes:Routes=[
  {path:'panel',component:AdminpanelComponent,
  children:[
    {path:'brand',component:BrandComponent},

    {path:'offer',component:OfferComponent},
    {path:'supplier',component:SupplierComponent}

  ]
},
   {path:'',redirectTo:'',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AdminpanelComponent,
    BrandComponent,

    OfferComponent,
    SupplierComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
     ReactiveFormsModule
  ]
})
export class AdminModule { }
