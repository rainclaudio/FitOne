import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'client-nutri',
    pathMatch: 'full'
  },
  {
    path: 'client-nutri',
    loadChildren: () => import('./client-nutri/client-nutri.module').then( m => m.ClientNutriPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'table',
    loadChildren: () => import('./table/table.module').then( m => m.TablePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },

  {
    path: 'client-persona',
    loadChildren: () => import('./client-persona/client-persona.module').then( m => m.ClientPersonaPageModule),
    canLoad:[AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
