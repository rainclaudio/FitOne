import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEvaluationPageModule } from './client-detail/new-evaluation/new-evaluation.module';
import { NewEvaluationPage } from './client-detail/new-evaluation/new-evaluation.page';

import { ClientNutriPage } from './client-nutri.page';

const routes: Routes = [
  {
    path: 'tabs',
    children: [

      {
        path:'new-client',
        loadChildren: () => import('./new-client/new-client.module').then(m => m.NewClientPageModule)
      },
      {
        path: 'client-detail/:clientId',
        loadChildren: () => import('./client-detail/client-detail.module').then(m => m.ClientDetailPageModule)
      },
      {
        path: '',
        component: ClientNutriPage,
        pathMatch:'full'
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
