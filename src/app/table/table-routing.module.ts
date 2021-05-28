import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablePage } from './table.page';
/*
el error estaba en que tenía path: 'tabs" siempre cargando el component table page
por lo que aun si estabas en sub table, la página siempre cargaba primero el component
table page

lo solucionamos simplemente cambiando el path tabs de manera que tenga que irse a su hijo
'', y si queremos ir a subtable lo hacemos mediante el routing
*/
const routes: Routes = [
  {
    path: 'tabs',
      children: [
        {
          path:'subtable',
          children: [
            {
              path:'',
              loadChildren: () => import('./subtable/subtable.module').then( m => m.SubtablePageModule)
            }
          ]
        },
        {
          path: '',
          component: TablePage,
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/table/tabs',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}
