import { TestBed } from '@angular/core/testing';

import { StockDataProviderService } from './stock-data-provider.service';

describe('StockDataProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockDataProviderService = TestBed.get(StockDataProviderService);
    expect(service).toBeTruthy();
  });
});
