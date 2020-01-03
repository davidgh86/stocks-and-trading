import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleChartsModule } from 'angular-google-charts';

import { StockChartRoutingModule } from './stock-chart-routing.module';
import { StockChartComponent } from './stock-chart.component';
import { ServiceModule } from './service/service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CandleChartComponent } from './candle-chart/candle-chart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [StockChartComponent, CandleChartComponent],
  imports: [
    CommonModule,
    StockChartRoutingModule,
    GoogleChartsModule,
    ServiceModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
})
export class StockChartModule { }
