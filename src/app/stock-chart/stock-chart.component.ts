import { Component, OnInit } from '@angular/core';
import { StockDataProviderService } from '../core/stock-data-provider.service';
import { AlphaAvantageMapperService } from '../core/alpha-avantage-mapper.service';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.sass']
})
export class StockChartComponent implements OnInit {

  title = '';
  type = 'CandlestickChart';
  data = [];
  options = {
    legend: 'none',
    candlestick: {
      fallingColor: { strokeWidth: 2, stroke: '#a52714' }, // red
      risingColor: { strokeWidth: 2, stroke: '#0f9d58' }   // green
    }
  };
  width;
  height;

  constructor(
    private stockDataProviderService: StockDataProviderService,
    private alphaAvantageMapperService: AlphaAvantageMapperService
    ) { }

  async ngOnInit() {
    const mainContainer = document.querySelector('#app-main-content');
    this.width = mainContainer.clientWidth;
    const posibleHeight = mainContainer.clientHeight;
    const ratioHeightWidth = 0.6;
    if ((posibleHeight / this.width) > ratioHeightWidth ) {
      this.height = ratioHeightWidth * this.width;
    } else {
      this.height = posibleHeight;
    }
    const dailyRequest = await this.stockDataProviderService.getDaily('AAPL');

    const alphaModelResponse = this.alphaAvantageMapperService.mapToTimeSerie(dailyRequest);
    console.log(alphaModelResponse.quotes[1].date instanceof Date)
    
    this.data = this.alphaAvantageMapperService.toGoogleChartModel(alphaModelResponse);
    
    console.log(JSON.stringify(this.data))
  }

}
