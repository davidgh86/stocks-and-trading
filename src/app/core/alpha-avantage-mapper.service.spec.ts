import { TestBed } from '@angular/core/testing';

import { AlphaAvantageMapperService } from './alpha-avantage-mapper.service';

describe('AlphaAvantageMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphaAvantageMapperService = TestBed.get(AlphaAvantageMapperService);
    expect(service).toBeTruthy();
  });

  it('mapper should workt', () => {
    const service: AlphaAvantageMapperService = TestBed.get(AlphaAvantageMapperService);
    const response = '{"Meta Data": {"1. Information":"Daily Prices (open, high, low, close) and Volumes","2. Symbol":"MSFT", "3. Last Refreshed":"2019-12-24", "4. Output Size":"Full size", "5. Time Zone":"US/Eastern"}, "Time Series (Daily)": {"2019-12-24": {"1. open":"157.4800","2. high":"157.7100","3. low":"157.1150","4. close":"157.3800","5. volume":"8988500"}, "2019-12-23":{"1. open":"158.1200","2. high":"158.1200","3. low":"157.2700","4. close":"157.4100","5. volume":"17726283"}}}'
    const resp = service.mapToTimeSerie(JSON.parse(response));
    expect(resp.metadata.information).toBe("Daily Prices (open, high, low, close) and Volumes");
    expect(resp.metadata.symbol).toBe("MSFT");
    expect(resp.metadata.lastRefreshed).toBe(new Date("2019-12-24"));
    expect(resp.metadata.outputSize).toBe("Full size");
    expect(resp.metadata.timeZone).toBe("US/Eastern");

    expect(resp.quotes[0].close).toBe(157.3800)
    expect(resp.quotes[0].date).toBe(new Date("2019-12-24"))
    expect(resp.quotes[0].high).toBe(157.7100)
    expect(resp.quotes[0].low).toBe(157.1150)
    expect(resp.quotes[0].open).toBe(157.4800)
    expect(resp.quotes[0].volume).toBe(8988500)

    expect(resp.quotes[0].close).toBe(157.4100)
    expect(resp.quotes[0].date).toBe(new Date("2019-12-23"))
    expect(resp.quotes[0].high).toBe(158.1200)
    expect(resp.quotes[0].low).toBe(157.2700)
    expect(resp.quotes[0].open).toBe(158.1200)
    expect(resp.quotes[0].volume).toBe(17726283)
    
  });
});
