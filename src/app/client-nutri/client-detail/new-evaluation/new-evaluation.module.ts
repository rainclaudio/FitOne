import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEvaluationPageRoutingModule } from './new-evaluation-routing.module';

import { NewEvaluationPage } from './new-evaluation.page';
import { ResultComponent } from './result/result.component';

@NgModule({
  imports: [
    CommonModule,
    // Importante para forms
    ReactiveFormsModule,
    IonicModule,
    NewEvaluationPageRoutingModule
  ],
  declarations: [NewEvaluationPage,ResultComponent],
  entryComponents: [ResultComponent]
})
export class NewEvaluationPageModule {}
