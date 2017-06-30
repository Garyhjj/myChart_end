import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicChartComponent } from './basic-chart/basic-chart.component';

const routes: Routes = [
  { path: 'basic', component: BasicChartComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'BasicChartComponent' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
