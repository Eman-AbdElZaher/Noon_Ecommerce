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
  {path:'unathorized',component:UnathorizedPageComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/Admin-Dashboard/admin/admin.module')
      .then(mod => mod.AdminModule)
  },
<<<<<<< HEAD
  {
    path: 'review',
    loadChildren: () => import('./components/client/review/review.module')
      .then(mod => mod.ReviewModule)
  },
=======
  {path:'unathorized',component:UnathorizedPageComponent},
>>>>>>> e33a549b326b09ce6029962909613df13a85b277
  { path: '**', component: PageNotFoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
