import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/client/register/register.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnathorizedPageComponent } from './components/unathorized-page/unathorized-page.component';

const routes: Routes = [
  {  
    path: 'login',
    loadChildren: () => import('./components/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {path:'register',component:RegisterComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/Admin-Dashboard/admin/admin.module')
      .then(mod => mod.AdminModule)
  },
  {path:'unathorized',component:UnathorizedPageComponent},
  { path: '**', component: PageNotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
