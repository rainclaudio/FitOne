import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEvaluationPage } from './new-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: NewEvaluationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEvaluationPageRoutingModule {}
