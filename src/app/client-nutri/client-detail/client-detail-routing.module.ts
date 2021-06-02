import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDetailPage } from './client-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailPage
  },
  {
    path: 'evaluation-detail',
    loadChildren: () => import('./evaluation-detail/evaluation-detail.module').then( m => m.EvaluationDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDetailPageRoutingModule {}
