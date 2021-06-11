import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/client/register/register.component';
import { UnathorizedPageComponent } from './components/unathorized-page/unathorized-page.component';
import { LoginModule } from './components/login/login.module';
import { UploadImageComponent } from './components/sharedComponent/upload-image/upload-image.component';
import { FooterComponent } from './components/sharedComponent/footer/footer.component';
import { DeleteModalComponent } from './components/sharedComponent/delete-modal/delete-modal.component';
import { HeaderComponent } from './components/sharedComponent/header/header.component';
import { ProductDetailsComponent } from './components/client/product-details/product-details.component';
import { WishlistProductComponent } from './components/client/wishlist-product/wishlist-product.component';
// import { SubcategoryComponent } from './components/Admin-Dashboard/admin/subcategory/subcategory.component';
import { HomeComponent } from './components/home/home.component';
import {ClientModule} from './components/client/client/client.module';
import { CheckoutOrderComponent } from './components/client/checkout-order/checkout-order.component'
import { CartModule } from './components/client/cart/cart.module';
import { AdminModule } from './components/Admin-Dashboard/admin/admin.module';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UnathorizedPageComponent,
    UploadImageComponent,
    DeleteModalComponent,
    UnathorizedPageComponent,  
    UploadImageComponent, FooterComponent,   
   ProductDetailsComponent, WishlistProductComponent,
  HeaderComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    ClientModule,
    AdminModule
     
  ],
  exports: [
    UploadImageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
