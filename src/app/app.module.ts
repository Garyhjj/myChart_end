import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing';

import { AppComponent } from './app.component';
import { BasicChartComponent } from './basic-chart/basic-chart.component';
import { DetailDefineComponent } from './detail-define/detail-define.component';

import{ ChartService } from './shared/service/chart.service';
import { NgValidatorExtendService } from './shared/service/ng-validator-extend.service';
@NgModule({
  declarations: [
    AppComponent,
    BasicChartComponent,
    DetailDefineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ChartService, NgValidatorExtendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
