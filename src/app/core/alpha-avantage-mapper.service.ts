import { Injectable } from '@angular/core';
import { TimeSerie } from './time-serie.model';

@Injectable({
  providedIn: 'root'
})
export class AlphaAvantageMapperService {

  constructor() { }

  public mapToTimeSerie(dailyResponse): TimeSerie {
    let metadata = dailyResponse['Meta Data'];
    let information = metadata['1. Information'];
    let symbol = metadata['2. Symbol'];
    let lastRefreshed = new Date(metadata['3. Last Refreshed']);
    let outputSize = metadata['4. Output Size'];
    let timeZone = metadata['5. Time Zone'];

    let timeSeriesData = dailyResponse['Time Series (Daily)']
    let timeSeriesArray = [];

    for (var key in timeSeriesData) {
      // check if the property/key is defined in the object itself, not in parent
      if (timeSeriesData.hasOwnProperty(key)) {  
          let quote = timeSeriesData[key]; 
          timeSeriesArray.push(
            {
              date: new Date(key),
              open: parseFloat(quote['1. open']),
              high: parseFloat(quote['2. high']),
              low: parseFloat(quote['3. low']),
              close: parseFloat(quote['4. close']),
              volume: parseFloat(quote['5. volume'])
            }
          )
      }
    }
    
    return {
      metadata: {
        information: information,
        symbol: symbol,
        lastRefreshed: lastRefreshed,
        interval: null,
        outputSize: outputSize,
        date: null,
        timeZone: timeZone
      },
      quotes: timeSeriesArray
    }
  }

  public toGoogleChartModel(timeSerie: TimeSerie){
    let result = [];
    let quotes = timeSerie.quotes;
    for (let quote of quotes){
      let upward = quote.open <= quote.close
      result.push([  
        quote.date, 
        upward?quote.low:quote.high,
        quote.open, 
        quote.close,
        upward?quote.high:quote.low
      ])
    }
    return result;
  }
}
