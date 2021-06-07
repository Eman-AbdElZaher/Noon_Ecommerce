import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCartProductsComponent } from './show-cart-products/show-cart-products.component';
import { CartproductDetailsComponent } from './cartproduct-details/cartproduct-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'details/:id',component:CartproductDetailsComponent},
  {path:'show',component:ShowCartProductsComponent},
 
   
]

@NgModule({
  declarations: [
    ShowCartProductsComponent,
    CartproductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class CartModule { }
