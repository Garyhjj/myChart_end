import { Component, OnInit } from '@angular/core';
import{ ChartService } from '../shared/service/chart.service';

@Component({
  selector: 'app-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.css']
})

export class BasicChartComponent implements OnInit {
  items:number[] = [1,2,3,4,5,6,7,8,9,10]
  seriesNum:number
  constructor(private chartService: ChartService) {  }
  ngOnInit() {
    console.log(this.chartService.getECharts());
  }

  changeSeries(e) {
    console.log(e.target.value)
  }
  initBasic(aaa) {
    console.log(aaa.value)
  }
}
