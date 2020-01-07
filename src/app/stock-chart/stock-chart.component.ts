import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.sass']
})
export class StockChartComponent implements OnInit, AfterViewChecked {
  subscriptionQueryParams: any;
  subscriptionParams: any;
  symbol: string;
  full: boolean;
  chartDataSending = true;

  settingsForm = new FormGroup({
    frequency: new FormControl(''),
    livereload: new FormControl(''),
    outputsize: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.full = this.route.snapshot.queryParams.full === 'true';
    this.settingsForm.patchValue({
      frequency: 'intraday',
      livereload: this.full,
      outputsize: this.full ? 'full' : 'compact'
    });
    this.symbol = this.route.snapshot.params.symbol;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  setValueAsRecieved() {
    this.chartDataSending = false;
  }
  setValueAsSending() {
    this.chartDataSending = true;
  }

}
