import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleChartsModule } from 'angular-google-charts';

import { StockChartRoutingModule } from './stock-chart-routing.module';
import { StockChartComponent } from './stock-chart.component';


@NgModule({
  declarations: [StockChartComponent],
  imports: [
    CommonModule,
    StockChartRoutingModule,
    GoogleChartsModule
  ]
})
export class StockChartModule { }
