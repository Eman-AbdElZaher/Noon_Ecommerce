import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnathorizedPageComponent } from './components/unathorized-page/unathorized-page.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {path:'unathorized',component:UnathorizedPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
