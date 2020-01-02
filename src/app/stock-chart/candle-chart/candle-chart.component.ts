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

    // Create a dashboard.
    var dashboard = new this.gLib.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // Create a range slider, passing some options
    var donutRangeSlider = new this.gLib.visualization.ControlWrapper({
      'controlType': 'ChartRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnIndex': 0
      }
    });

    // Create a pie chart, passing some options
    var pieChart = new this.gLib.visualization.ChartWrapper({
      'chartType': 'CandlestickChart',
      'containerId': 'chart_div',
      'options': {
        'width': 300,
        'height': 300
      }
    });

    // Establish dependencies, declaring that 'filter' drives 'pieChart',
    // so that the pie chart will only display entries that are let through
    // given the chosen slider range.
    dashboard.bind(donutRangeSlider, pieChart);

    // Draw the dashboard.
    dashboard.draw(data);
  }

  ngOnInit() {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {packages: ['corechart', 'table', 'controls', 'timeline']});
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

}
