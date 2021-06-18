import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { HomeComponent } from './components/home/home.component';
import { ClientModule } from './components/client/client/client.module'
import { AdminModule } from './components/Admin-Dashboard/admin/admin.module';
import { CartModule } from './components/client/cart/cart.module';
import { ReviewModule } from './components/client/review/review.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { NavbarComponent } from './components/sharedComponent/navbar/navbar.component';
import { CreateReviewComponent } from './components/client/review/create-review/create-review.component';
import { UpdateReviewComponent } from './components/client/review/update-review/update-review.component';
import { ShowReviewComponent } from './components/client/review/show-review/show-review.component';
import { SubcategoryproductComponent } from './components/client/subcategoryproduct/subcategoryproduct.component';
import { PaymentComponent } from './components/client/payment/payment.component';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    HeaderComponent, HomeComponent,
    UnathorizedPageComponent,  
    UploadImageComponent, FooterComponent,   
   ProductDetailsComponent, WishlistProductComponent,
  HeaderComponent, HomeComponent,
  NavbarComponent,ShowReviewComponent,UpdateReviewComponent,CreateReviewComponent,
  SubcategoryproductComponent,
  PaymentComponent
 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    ClientModule,
    AdminModule,
    CartModule,
     ReviewModule,
    CarouselModule,
    
  ],
  exports: [
    UploadImageComponent,
     CreateReviewComponent,
    UpdateReviewComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
