import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
 /*  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }, */
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: NoPageFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesModule,
    AuthModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
