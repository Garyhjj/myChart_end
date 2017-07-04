import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing';

import { AppComponent } from './app.component';
import { BasicChartComponent } from './basic-chart/basic-chart.component';
import { DetailDefineComponent } from './detail-define/detail-define.component';

import{ ChartService } from './shared/service/chart.service';
import { MyBMapDirective }  from './shared/directive/Bmap.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicChartComponent,
    DetailDefineComponent,
    MyBMapDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
