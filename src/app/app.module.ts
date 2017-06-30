import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing';

import { AppComponent } from './app.component';
import { BasicChartComponent } from './basic-chart/basic-chart.component';

import{ ChartService } from './shared/service/chart.service';

@NgModule({
  declarations: [
    AppComponent,
    BasicChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
