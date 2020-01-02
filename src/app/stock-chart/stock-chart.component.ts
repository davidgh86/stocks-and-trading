import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.sass']
})
export class StockChartComponent implements OnInit, OnDestroy {
  subscriptionQueryParams: any;
  subscriptionParams: any;
  symbol: string;
  full: boolean;

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {

    this.subscriptionQueryParams = this.route
      .queryParams
      .subscribe(params => {
        this.full = !!params.full ? params.full === 'true' : false;
      });

    this.subscriptionParams = this.route
      .params
      .subscribe(params => {
        this.symbol = params.symbol;
      });
  }

  ngOnDestroy() {
    this.subscriptionQueryParams.unsubscribe();
    this.subscriptionParams.unsubscribe();
  }

}
