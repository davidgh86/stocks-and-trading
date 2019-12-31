import { Component, OnInit, Input } from '@angular/core';
import { StockDataProviderService } from '../core/stock-data-provider.service';
import { AlphaAvantageMapperService } from '../core/alpha-avantage-mapper.service';
import { ActivatedRoute } from '@angular/router';

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
    private alphaAvantageMapperService: AlphaAvantageMapperService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.setSize();
    const symbol = this.route.snapshot.paramMap.get('symbol');
    const dailyRequest = await this.stockDataProviderService.getDaily(symbol);
    const alphaModelResponse = this.alphaAvantageMapperService.mapToTimeSerie(dailyRequest);
    this.data = this.alphaAvantageMapperService.toGoogleChartModel(alphaModelResponse);//.filter(a => a[0]>new Date("2019-11-1"));

  }

  setSize() {
    const mainContainer = document.querySelector('#app-main-content');
    this.width = mainContainer.clientWidth;
    const posibleHeight = mainContainer.clientHeight;
    const ratioHeightWidth = 0.6;
    if ((posibleHeight / this.width) > ratioHeightWidth ) {
      this.height = ratioHeightWidth * this.width;
    } else {
      this.height = posibleHeight;
    }
  }

}
