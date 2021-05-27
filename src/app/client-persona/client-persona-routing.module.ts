import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPersonaPage } from './client-persona.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPersonaPageRoutingModule {}
