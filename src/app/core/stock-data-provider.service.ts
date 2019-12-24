import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockDataProviderService {

  constructor(private http: HttpClient) { }

  async getDaily(symbol: string) {
    return await this.http.get('http://localhost:3000/daily/' + symbol).pipe;
  }
}
