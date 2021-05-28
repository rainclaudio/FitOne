import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEvaluationPageRoutingModule } from './new-evaluation-routing.module';

import { NewEvaluationPage } from './new-evaluation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEvaluationPageRoutingModule
  ],
  declarations: [NewEvaluationPage]
})
export class NewEvaluationPageModule {}
