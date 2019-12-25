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
  data = null;
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

  ngOnInit() {
    const mainContainer = document.querySelector('#app-main-content');
    this.width = mainContainer.clientWidth;
    const posibleHeight = mainContainer.clientHeight;
    const ratioHeightWidth = 0.6;
    if ((posibleHeight / this.width) > ratioHeightWidth ) {
      this.height = ratioHeightWidth * this.width;
    } else {
      this.height = posibleHeight;
    }
    let pipe = this.stockDataProviderService.getDaily('MSFT');
    let dataToPaint;
    pipe.subscribe(response => {
      dataToPaint = this.alphaAvantageMapperService.mapToTimeSerie(response);
    });
    this.data = [
      // minimum, open, close, maximum
      [new Date('2019-1-1'), 20, 28, 38, 45],
      [new Date('2019-1-2'), 31, 38, 55, 66],
      [new Date('2019-1-3'), 50, 55, 77, 80],
      [new Date('2019-1-4'), 77, 77, 66, 50],
      [new Date('2019-1-5'), 68, 66, 22, 15],
    ];
  }

}
