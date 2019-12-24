import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataProviderService } from './stock-data-provider.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    StockDataProviderService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should not run');
    }
  }
}
