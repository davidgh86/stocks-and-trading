import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexesComponent } from './indexes.component';

const routes: Routes = [{ path: '', component: IndexesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexesRoutingModule { }
