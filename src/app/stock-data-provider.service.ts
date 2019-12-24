import { Injectable } from '@angular/core';
import * as GoogleService from 'google-finance';

@Injectable({
  providedIn: 'root'
})
export class StockDataProviderService {

  googleService = new GoogleService();

  constructor() { }

  getHistorical(symbol, dateFrom, dateTo) {
    return this.googleService.getHistorical(symbol, dateFrom, dateTo);
  }
}
