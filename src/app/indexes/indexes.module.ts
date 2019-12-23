import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexesRoutingModule } from './indexes-routing.module';
import { IndexesComponent } from './indexes.component';


@NgModule({
  declarations: [IndexesComponent],
  imports: [
    CommonModule,
    IndexesRoutingModule
  ]
})
export class IndexesModule { }
