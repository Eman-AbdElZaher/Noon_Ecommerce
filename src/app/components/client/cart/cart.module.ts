import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCartProductsComponent } from './show-cart-products/show-cart-products.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { CheckoutOrderComponent } from '../checkout-order/checkout-order.component';


const routes:Routes=[
  {path:'show',component:ShowCartProductsComponent},
 
   
]

@NgModule({
  declarations: [
    ShowCartProductsComponent,
    // CheckoutOrderComponent
  
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    // AppModule
  
  ]
})
export class CartModule { }
