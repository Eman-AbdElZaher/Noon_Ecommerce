import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './adminpanel/brand/brand.component';

const routes:Routes=[
  {path:'panel',component:AdminpanelComponent,
  children:[
    {path:'brand',component:BrandComponent}
  ]
},
   {path:'',redirectTo:'',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AdminpanelComponent,
    BrandComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
     ReactiveFormsModule
  ]
})
export class AdminModule { }
