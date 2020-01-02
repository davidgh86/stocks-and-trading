import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'indexes',
    loadChildren: () => import('./indexes/indexes.module').then(m => m.IndexesModule)
  },
  {
    path: 'indexes/stock-chart/:symbol',
    loadChildren: () => import('./stock-chart/stock-chart.module').then(m => m.StockChartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
