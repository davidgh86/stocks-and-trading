import { Injectable } from '@angular/core';
import { TimeSerie } from './time-serie.model';

@Injectable({
  providedIn: 'root'
})
export class AlphaAvantageMapperService {

  constructor() { }

  private getDataKey(response) {
    let keys = Object.keys(response);
    for (let key of keys) {
      if (key !== 'Meta Data') {
        return key;
      }
    }
  }

  public mapToTimeSerie(response): TimeSerie {
    const metadata = response['Meta Data'];
    const information = metadata['1. Information'];
    const symbol = metadata['2. Symbol'];
    const lastRefreshed = new Date(metadata['3. Last Refreshed']);
    const outputSize = metadata['4. Output Size'];
    const timeZone = metadata['5. Time Zone'];

    const timeSeriesData = response[this.getDataKey(response)];
    const timeSeriesArray = [];

    for (let key in timeSeriesData) {
      // check if the property/key is defined in the object itself, not in parent
      if (timeSeriesData.hasOwnProperty(key)) {
          const quote = timeSeriesData[key];
          timeSeriesArray.push(
            {
              date: new Date(key),
              open: parseFloat(quote['1. open']),
              high: parseFloat(quote['2. high']),
              low: parseFloat(quote['3. low']),
              close: parseFloat(quote['4. close']),
              volume: parseFloat(quote['5. volume'])
            }
          );
      }
    }

    return {
      metadata: {
        information,
        symbol,
        lastRefreshed,
        interval: null,
        outputSize,
        date: null,
        timeZone
      },
      quotes: timeSeriesArray
    };
  }

  public toGoogleChartModel(timeSerie: TimeSerie) {
    const result = [];
    const quotes = timeSerie.quotes;
    for (const quote of quotes) {
      const upward = quote.open <= quote.close;
      result.push([
        quote.date,
        upward ? quote.low : quote.high,
        quote.open,
        quote.close,
        upward ? quote.high : quote.low,
        quote.volume
      ]);
    }
    return result;
  }
}
