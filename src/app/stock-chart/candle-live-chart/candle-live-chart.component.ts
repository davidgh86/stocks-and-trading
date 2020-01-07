import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';
import { StockDataProviderService } from 'src/app/core/stock-data-provider.service';
import { AlphaAvantageMapperService } from 'src/app/core/alpha-avantage-mapper.service';

@Component({
  selector: 'app-candle-live-chart',
  templateUrl: './candle-live-chart.component.html',
  styleUrls: ['./candle-live-chart.component.sass']
})
export class CandleLiveChartComponent implements OnInit, OnDestroy {

  @Input() symbol: string;
  // tslint:disable-next-line: no-input-rename
  @Input() live: boolean;
  @Output() stockValueSending = new EventEmitter();
  @Output() stockValueReceived = new EventEmitter();

  private gLib: any;
  data: google.visualization.DataTable;
  dash: any;
  control: any;
  interval: NodeJS.Timer;

  constructor(private gChartService: GoogleChartService,
              private stockDataProviderService: StockDataProviderService,
              private alphaAvantageMapperService: AlphaAvantageMapperService) {
  }

  private async getDataResponse(symbol) {
    return await this.stockDataProviderService.getIntraday(symbol, false);
  }

  private async getCurrentQuote(symbol) {
    return await this.stockDataProviderService.getCurrentQuoteValue(symbol);
  }

  private async drawChart() {

    await this.getInitialData(this.symbol);

    this.dash = new this.gLib.visualization.Dashboard(document.getElementById('dashboard'));

    this.control = new this.gLib.visualization.ControlWrapper({
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
        chartType: 'ComboChart',
        containerId: 'chart_div',
        options: {
          title: this.symbol,
          legend: 'none',
          vAxes: {
            0: { logScale: false, title: 'stock value' },
            1: {
              logScale: false,
              title: 'volume',
            }
          },
          seriesType: 'candlesticks',
          series: {1: {type: 'line', targetAxisIndex: 1}},
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

    this.dash.bind([this.control], [chart]);
    this.dash.draw(this.data);

    this.interval = setInterval(async() => {
      await this.updateData(this.symbol);
      this.dash.draw(this.data);
    }, 5000);
  }

  ngOnInit() {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('visualization', '1', {packages: ['controls', 'charteditor']});

    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  private async getInitialData(symbol) {
    this.stockValueSending.emit();
    const dataResponse = await this.getDataResponse(symbol);
    const alphaModelResponse = this.alphaAvantageMapperService.mapToTimeSerie(dataResponse);
    const dataArray = this.alphaAvantageMapperService.toGoogleChartModel(alphaModelResponse);
    this.data = google.visualization.arrayToDataTable(dataArray, true);
    this.stockValueReceived.emit();
  }

  private async updateData(symbol) {
    const dataResponse = await this.getCurrentQuote(symbol);
    const alphaModelResponse = this.alphaAvantageMapperService.mapToGlobalQuote(dataResponse);
    const dataArray = this.alphaAvantageMapperService.qouteToGoogleChartModel(alphaModelResponse);
    this.data.addRows(dataArray);
    // TODO add data and refresh this.data = google.visualization.arrayToDataTable(dataArray, true);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
