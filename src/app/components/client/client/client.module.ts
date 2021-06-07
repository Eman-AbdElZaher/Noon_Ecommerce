import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductshomeComponent } from '../productshome/productshome.component';
const routes:Routes=[
  
  {path:'slider',component:SliderComponent}
];


@NgModule({
  declarations: [
    SliderComponent,
    ProductshomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
