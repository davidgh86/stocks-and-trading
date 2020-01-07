import { Injectable } from '@angular/core';
import { TimeSerie } from './time-serie.model';
import { AlphavantageQuote } from './alphavantage-quote.model';

@Injectable({
  providedIn: 'root'
})
export class AlphaAvantageMapperService {
  moment: any;

  constructor() {
    this.moment = require('moment-timezone');
  }

  private getDataKey(response) {
    const keys = Object.keys(response);
    for (const key of keys) {
      if (key !== 'Meta Data') {
        return key;
      }
    }
  }

  public mapToTimeSerie(response): TimeSerie {
    const metadata = response['Meta Data'];
    const information = metadata['1. Information'];
    const symbol = metadata['2. Symbol'];

    const outputSize = metadata['4. Output Size'];
    let timeZone = metadata['5. Time Zone'];
    if (!timeZone) {
      timeZone = metadata['6. Time Zone'];
    }
    const lastRefreshed = new Date(this.moment.tz(metadata['3. Last Refreshed'], timeZone).valueOf());

    const timeSeriesData = response[this.getDataKey(response)];
    const timeSeriesArray = [];

    for (const key in timeSeriesData) {
      // check if the property/key is defined in the object itself, not in parent
      if (timeSeriesData.hasOwnProperty(key)) {
          const quote = timeSeriesData[key];
          timeSeriesArray.push(
            {
              //date: new Date(key),
              date: new Date(this.moment.tz(key, timeZone).valueOf()),
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

  public mapToGlobalQuote(response): AlphavantageQuote {
    const globalQuote = response['Global Quote'];
    const date = new Date(Date.now());
    const open = parseFloat(globalQuote['02. open']);
    const high = parseFloat(globalQuote['03. high']);
    const low = parseFloat(globalQuote['04. low']);
    const close = parseFloat(globalQuote['05. price']);
    const volume = parseFloat(globalQuote['06. volume']);
    return {
        date,
        open,
        high,
        low,
        close,
        volume
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

  public qouteToGoogleChartModel(quote: AlphavantageQuote) {
    const result = [];

    const upward = quote.open <= quote.close;
    result.push([
      quote.date,
      upward ? quote.low : quote.high,
      quote.open,
      quote.close,
      upward ? quote.high : quote.low,
      quote.volume
    ]);
    return result;
  }
}
