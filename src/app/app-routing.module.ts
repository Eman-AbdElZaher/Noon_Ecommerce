import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ProductDetailsComponent } from './components/client/product-details/product-details.component';
import { RegisterComponent } from './components/client/register/register.component';
import { WishlistProductComponent } from './components/client/wishlist-product/wishlist-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnathorizedPageComponent } from './components/unathorized-page/unathorized-page.component';
import { CheckoutOrderComponent } from './components/client/checkout-order/checkout-order.component';
import { SubcategoryproductComponent } from './components/client/subcategoryproduct/subcategoryproduct.component';
import { PaymentComponent } from './components/client/payment/payment.component';
import { AllProductsComponent } from './components/client/all-products/all-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [ 
  {  
    path: 'login', 
    loadChildren: () => import('./components/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {path:'register',component:RegisterComponent},
  {path:'wishlist',component:WishlistProductComponent,canActivate: [AuthGuard]},
  {path:'home/productPage/:id',component:ProductDetailsComponent},
  {path:'subcategoryProduct/:id',component:SubcategoryproductComponent},
  {path:'unathorized',component:UnathorizedPageComponent},
  {path:'check',component: CheckoutOrderComponent},
  {path:'payment',component:PaymentComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/Admin-Dashboard/admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./components/client/review/review.module')
      .then(mod => mod.ReviewModule)
  },
  {
    path: 'cartproduct',
    loadChildren: () => import('./components/client/cart/cart.module')
      .then(mod => mod.CartModule)
  },
  {path:'AllProduct',component:AllProductsComponent},
// children:[
//   {path:'AllProduct/:id',component:AllProductsComponent}
// ]},
  {
    path: 'client',
    loadChildren: () => import('./components/client/client/client.module')
      .then(mod => mod.ClientModule)
  },
  {path:'unathorized',component:UnathorizedPageComponent},
  {path:'home',component:HomeComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
