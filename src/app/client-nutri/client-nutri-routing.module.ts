import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientNutriPage } from './client-nutri.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ClientNutriPage,
    children: [
      {
        path: '',
        
      }
    ]
  },
  // {
  //   path: 'client-detail',
  //   loadChildren: () => import('./client-detail/client-detail.module').then( m => m.ClientDetailPageModule)
  // },
  // {
  //   path: 'new-client',
  //   loadChildren: () => import('./new-client/new-client.module').then( m => m.NewClientPageModule)
  // },
  // {
  //   path: 'new-evaluation',
  //   loadChildren: () => import('./new-evaluation/new-evaluation.module').then( m => m.NewEvaluationPageModule)
  // },
  {
    path: '',
    redirectTo:'/client-nutri/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientNutriPageRoutingModule {}
