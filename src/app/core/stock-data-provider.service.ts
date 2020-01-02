import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TimeSerie } from './time-serie.model';

@Injectable({
  providedIn: 'root'
})
export class StockDataProviderService {

  private url = ''

  constructor(private http: HttpClient) { }

  messages: string[] = [];

  async getDaily(symbol: string, fullContent: boolean): Promise<any> {

    const result = await this.http.get<any>(`${this.url}/daily/${symbol}?full=${fullContent}`).toPromise();

    return result;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
