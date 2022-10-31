import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signin', 
    loadChildren: () => import('./components/signin/signin-routing.module').then(m => m.SigninRoutingModule)
  },
  {
    path: '',
    loadChildren: () => import('./components/home/home-routing.module').then(m => m.HomeRoutingModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
