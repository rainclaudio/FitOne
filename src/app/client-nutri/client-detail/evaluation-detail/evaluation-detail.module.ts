import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluationDetailPageRoutingModule } from './evaluation-detail-routing.module';

import { EvaluationDetailPage } from './evaluation-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluationDetailPageRoutingModule
  ],
  declarations: [EvaluationDetailPage]
})
export class EvaluationDetailPageModule {}
