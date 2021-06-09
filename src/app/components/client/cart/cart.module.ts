import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCartProductsComponent } from './show-cart-products/show-cart-products.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'show',component:ShowCartProductsComponent},
 
   
]

@NgModule({
  declarations: [
    ShowCartProductsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class CartModule { }
