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

    const dash = new this.gLib.visualization.Dashboard(document.getElementById('dashboard'));

    const control = new this.gLib.visualization.ControlWrapper({
        controlType: 'ChartRangeFilter',
        containerId: 'control_div',
        options: {
            filterColumnIndex: 0,
            ui: {
                chartOptions: {
                    height: 30,
                    width: 600,
                    chartArea: {
                        width: '90%'
                    }
                }
            }
        }
    });

    const chart = new this.gLib.visualization.ChartWrapper({
        chartType: 'CandlestickChart',
        containerId: 'chart_div',
        options: {
          title: this.symbol,
          legend: 'none',
          height: 500,
          candlestick: {
            fallingColor: { strokeWidth: 2, stroke: '#a52714' }, // red
            risingColor: { strokeWidth: 2, stroke: '#0f9d58' }   // green
          }
        }
    });

    function setOptions(wrapper) {

        wrapper.setOption('width', 600);
        wrapper.setOption('chartArea.width', '80%');

    }

    setOptions(chart);


    dash.bind([control], [chart]);
    dash.draw(data);

}

  ngOnInit() {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('visualization', '1', {packages: ['controls', 'charteditor']});

    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

}
