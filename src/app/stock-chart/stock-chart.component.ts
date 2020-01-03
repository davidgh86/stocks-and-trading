import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.sass']
})
export class StockChartComponent implements OnInit {
  subscriptionQueryParams: any;
  subscriptionParams: any;
  symbol: string;
  full: boolean;
  chartDataReceived: boolean;

  settingsForm = new FormGroup({
    frequency: new FormControl(''),
    livereload: new FormControl(''),
    outputsize: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.full = this.route.snapshot.queryParams.full === 'true';
    this.settingsForm.patchValue({
      livereload: this.full,
      outputsize: this.full ? 'full' : 'compact'
    });
    this.symbol = this.route.snapshot.params.symbol;
    this.chartDataReceived = false;
  }

  setValueAsRecieved() {
    this.chartDataReceived = true;
  }

}
