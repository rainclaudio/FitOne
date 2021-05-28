import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubtablePageRoutingModule } from './subtable-routing.module';

import { SubtablePage } from './subtable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubtablePageRoutingModule
  ],
  declarations: [SubtablePage]
})
export class SubtablePageModule {}
