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
<<<<<<< HEAD

import { ReviewModule } from './components/client/review/review.module';
=======
import { CreateReviewComponent } from './components/client/Review/create-review/create-review.component';
import { UpdateReviewComponent } from './components/client/Review/update-review/update-review.component';
import { ShowReviewComponent } from './components/client/Review/show-review/show-review.component';
import { UploadImageComponent } from './components/sharedComponent/upload-image/upload-image.component';
>>>>>>> e33a549b326b09ce6029962909613df13a85b277

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UnathorizedPageComponent,
<<<<<<< HEAD
    
    
 
=======
    CreateReviewComponent,
    UpdateReviewComponent,
    ShowReviewComponent,   
    UploadImageComponent
>>>>>>> e33a549b326b09ce6029962909613df13a85b277
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
