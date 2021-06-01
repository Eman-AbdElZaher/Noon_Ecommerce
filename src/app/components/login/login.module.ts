import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[{
  path:'login',component:LoginComponent},
   {path:'',redirectTo:'/login',pathMatch:'full'}
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
   RouterModule.forChild(routes),
   FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
