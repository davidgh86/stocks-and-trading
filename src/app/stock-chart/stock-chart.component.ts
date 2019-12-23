import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.sass']
})
export class StockChartComponent implements OnInit {

  title = '';
  type = 'CandlestickChart';
  data = [
    // minimum, open, close, maximum
      ["Mon", 20, 28, 38, 45],
      ["Tue", 31, 38, 55, 66],
      ["Wed", 50, 55, 77, 80],
      ["Thu", 77, 77, 66, 50],
      ["Fri", 68, 66, 22, 15]
  ];
  columnNames = ['Date', 'A','B','C','D'];
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
  }

}
