import { AlphavantageMetadata } from './alphavantage-metadata.model';
import { AlphavantageQuote } from './alphavantage-quote.model';

export interface TimeSerie {
  metadata: AlphavantageMetadata;
  quotes: Array<AlphavantageQuote>;
}
