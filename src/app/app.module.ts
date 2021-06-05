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

import { ReviewModule } from './components/client/review/review.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UnathorizedPageComponent,
    
    
 
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
