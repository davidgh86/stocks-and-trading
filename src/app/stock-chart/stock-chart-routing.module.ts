import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockChartComponent } from './stock-chart.component';

const routes: Routes = [{ path: '', component: StockChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockChartRoutingModule { }
