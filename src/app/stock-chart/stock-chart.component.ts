import { Component, OnInit } from '@angular/core';

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
  width = 550;
  height = 400;

  constructor() { }

  ngOnInit() {
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
