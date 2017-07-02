import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicChartComponent } from './basic-chart/basic-chart.component';
import { DetailDefineComponent } from './detail-define/detail-define.component';

const routes: Routes = [
  { path: 'basic', component: BasicChartComponent },
  { path: 'detail', component: DetailDefineComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'BasicChartComponent' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
