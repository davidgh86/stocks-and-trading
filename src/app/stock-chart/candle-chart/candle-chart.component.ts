import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';
import { StockDataProviderService } from 'src/app/core/stock-data-provider.service';
import { AlphaAvantageMapperService } from 'src/app/core/alpha-avantage-mapper.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candle-chart',
  templateUrl: './candle-chart.component.html',
  styleUrls: ['./candle-chart.component.sass']
})
export class CandleChartComponent implements OnInit {

  @Input() symbol: string;
  // tslint:disable-next-line: no-input-rename
  @Input('full-content') fullContent: boolean;
  @Output() stockValueReceived = new EventEmitter();

  private gLib: any;

  constructor(private gChartService: GoogleChartService,
              private stockDataProviderService: StockDataProviderService,
              private alphaAvantageMapperService: AlphaAvantageMapperService) {
  }

  private async drawChart() {

    const dailyRequest = await this.stockDataProviderService.getDaily(this.symbol, this.fullContent);
    this.stockValueReceived.emit();
    const alphaModelResponse = this.alphaAvantageMapperService.mapToTimeSerie(dailyRequest);
    const dataArray = this.alphaAvantageMapperService.toGoogleChartModel(alphaModelResponse);//.filter(a => a[0]>new Date("2019-11-1"));
    const data = google.visualization.arrayToDataTable(dataArray, true);

    const chart = new this.gLib.visualization.CandlestickChart(document.getElementById('divLineChart'));

    const options = {
      title: this.symbol,
      legend: 'none',
      width: 800,
      height: 600,
      candlestick: {
        fallingColor: { strokeWidth: 2, stroke: '#a52714' }, // red
        risingColor: { strokeWidth: 2, stroke: '#0f9d58' }   // green
      }
    };
    chart.draw(data, options);
  }

  ngOnInit() {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {packages: ['corechart', 'table']});
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

}
