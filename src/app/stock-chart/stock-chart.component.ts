import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {

    this.full = this.route.snapshot.queryParams.full === 'true';

    this.symbol = this.route.snapshot.params.symbol;
  }

}
