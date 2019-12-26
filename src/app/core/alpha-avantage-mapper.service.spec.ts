import { TestBed } from '@angular/core/testing';

import { AlphaAvantageMapperService } from './alpha-avantage-mapper.service';

describe('AlphaAvantageMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphaAvantageMapperService = TestBed.get(AlphaAvantageMapperService);
    expect(service).toBeTruthy();
  });

  it('mapper to alphaAvantageMapper should workt', () => {
    const service: AlphaAvantageMapperService = TestBed.get(AlphaAvantageMapperService);
    const response = '{"Meta Data": {"1. Information":"Daily Prices (open, high, low, close) and Volumes","2. Symbol":"MSFT", "3. Last Refreshed":"2019-12-24", "4. Output Size":"Full size", "5. Time Zone":"US/Eastern"}, "Time Series (Daily)": {"2019-12-24": {"1. open":"157.4800","2. high":"157.7100","3. low":"157.1150","4. close":"157.3800","5. volume":"8988500"}, "2019-12-23":{"1. open":"158.1200","2. high":"158.1200","3. low":"157.2700","4. close":"157.4100","5. volume":"17726283"}}}'
    const resp = service.mapToTimeSerie(JSON.parse(response));
    expect(resp.metadata.information).toBe("Daily Prices (open, high, low, close) and Volumes");
    expect(resp.metadata.symbol).toBe("MSFT");
    expect(resp.metadata.lastRefreshed).toEqual(new Date("2019-12-24"));
    expect(resp.metadata.outputSize).toBe("Full size");
    expect(resp.metadata.timeZone).toBe("US/Eastern");

    expect(resp.quotes[0].close).toBe(157.3800)
    expect(resp.quotes[0].date).toEqual(new Date("2019-12-24"))
    expect(resp.quotes[0].high).toBe(157.7100)
    expect(resp.quotes[0].low).toBe(157.1150)
    expect(resp.quotes[0].open).toBe(157.4800)
    expect(resp.quotes[0].volume).toBe(8988500)

    expect(resp.quotes[1].close).toBe(157.4100)
    expect(resp.quotes[1].date).toEqual(new Date("2019-12-23"))
    expect(resp.quotes[1].high).toBe(158.1200)
    expect(resp.quotes[1].low).toBe(157.2700)
    expect(resp.quotes[1].open).toBe(158.1200)
    expect(resp.quotes[1].volume).toBe(17726283)
    
  });

  it('mapper to google chart should workt', () => {
    const service: AlphaAvantageMapperService = TestBed.get(AlphaAvantageMapperService);
    const response = JSON.parse('{"Meta Data": {"1. Information":"Daily Prices (open, high, low, close) and Volumes","2. Symbol":"MSFT", "3. Last Refreshed":"2019-12-24", "4. Output Size":"Full size", "5. Time Zone":"US/Eastern"}, "Time Series (Daily)": {"2019-12-24": {"1. open":"157.4800","2. high":"157.7100","3. low":"157.1150","4. close":"157.3800","5. volume":"8988500"}, "2019-12-23":{"1. open":"158.1200","2. high":"160.1200","3. low":"157.2700","4. close":"159.4100","5. volume":"17726283"}}}');
    const mappedResponse = service.mapToTimeSerie(response);
    const googleChartFormatQuote = service.toGoogleChartModel(mappedResponse);
    
    // {"2019-12-24": {"1. open":"157.4800","2. high":"157.7100","3. low":"157.1150","4. close":"157.3800","5. volume":"8988500"}
    expect(googleChartFormatQuote[0][0]).toEqual(new Date("2019-12-24"))
    expect(googleChartFormatQuote[0][1]).toBe(157.7100)
    expect(googleChartFormatQuote[0][2]).toBe(157.4800)
    expect(googleChartFormatQuote[0][3]).toBe(157.3800)
    expect(googleChartFormatQuote[0][4]).toBe(157.1150)

    // "2019-12-23":{"1. open":"158.1200","2. high":"160.1200","3. low":"157.2700","4. close":"159.4100","5. volume":"17726283"}
    expect(googleChartFormatQuote[1][0]).toEqual(new Date("2019-12-23"))
    expect(googleChartFormatQuote[1][1]).toBe(157.2700)
    expect(googleChartFormatQuote[1][2]).toBe(158.1200)
    expect(googleChartFormatQuote[1][3]).toBe(159.4100)
    expect(googleChartFormatQuote[1][4]).toBe(160.1200)
  });

});
