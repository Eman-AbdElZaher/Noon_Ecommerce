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
<<<<<<< HEAD
import { CreateReviewComponent } from './components/client/Review/create-review/create-review.component';
import { UpdateReviewComponent } from './components/client/Review/update-review/update-review.component';
import { ShowReviewComponent } from './components/client/Review/show-review/show-review.component';
import { HeaderComponent } from './components/sharedComponent/header/header.component';
import { CarouselComponent } from './components/client/carousel/carousel.component';
import { ShowsubcategoryComponent } from './components/client/showsubcategory/showsubcategory.component';


=======
import { HeaderComponent } from './components/sharedComponent/header/header.component';
import { ProductDetailsComponent } from './components/client/product-details/product-details.component';
import { WishlistProductComponent } from './components/client/wishlist-product/wishlist-product.component';
// import { SubcategoryComponent } from './components/Admin-Dashboard/admin/subcategory/subcategory.component';
import { HomeComponent } from './components/home/home.component';
import {ClientModule} from './components/client/client/client.module'
>>>>>>> 9fe22d8322a4ec51e4fe79c8c069fd66a49cc8cf
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UnathorizedPageComponent,
    UploadImageComponent,
    DeleteModalComponent,
    UnathorizedPageComponent,  
<<<<<<< HEAD
    UploadImageComponent,
     HeaderComponent,
    CarouselComponent,
    ShowsubcategoryComponent
  
=======
    UploadImageComponent, FooterComponent,   
   ProductDetailsComponent, WishlistProductComponent,
  HeaderComponent, HomeComponent
>>>>>>> 9fe22d8322a4ec51e4fe79c8c069fd66a49cc8cf
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    ClientModule
  ],
  exports: [
    UploadImageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
