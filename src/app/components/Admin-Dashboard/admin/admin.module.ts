import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './adminpanel/brand/brand.component';
import { SupplierComponent } from './adminpanel/supplier/supplier.component';
import { ProductComponent } from './adminpanel/product/product.component';
import { ImageComponent } from './adminpanel/image/image.component';

const routes:Routes=[
  {path:'panel',component:AdminpanelComponent,
  children:[
    {path:'brand',component:BrandComponent},
    {path:'supplier',component:SupplierComponent},
    {path:'product',component:ProductComponent},
    {path:'image',component:ImageComponent}
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
    ImageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
     ReactiveFormsModule
  ]
})
export class AdminModule { }
