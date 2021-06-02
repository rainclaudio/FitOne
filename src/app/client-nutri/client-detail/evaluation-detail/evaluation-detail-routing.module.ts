import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationDetailPage } from './evaluation-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationDetailPageRoutingModule {}
