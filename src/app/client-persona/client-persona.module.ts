import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientPersonaPageRoutingModule } from './client-persona-routing.module';

import { ClientPersonaPage } from './client-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientPersonaPageRoutingModule
  ],
  declarations: [ClientPersonaPage]
})
export class ClientPersonaPageModule {}
