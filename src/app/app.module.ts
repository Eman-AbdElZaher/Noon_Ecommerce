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

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UnathorizedPageComponent,  
    UploadImageComponent, FooterComponent,
    
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
