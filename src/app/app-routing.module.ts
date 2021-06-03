import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/client/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnathorizedPageComponent } from './components/unathorized-page/unathorized-page.component';

const routes: Routes = [
  // { انا عملت كومنت ع دى علشان كنت بجرب لينك الlogin اللى ف register page بس متقلقوش كله شغال 
  //   path: 'login',
  //   loadChildren: () => import('./components/login/login.module')
  //     .then(mod => mod.LoginModule)
  // },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'unathorized',component:UnathorizedPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
