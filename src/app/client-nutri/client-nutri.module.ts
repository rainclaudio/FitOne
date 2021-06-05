import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClientNutriPageRoutingModule } from './client-nutri-routing.module';

import { ClientNutriPage } from './client-nutri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientNutriPageRoutingModule
  ],
  declarations: [ClientNutriPage]
})
export class ClientNutriPageModule {}
