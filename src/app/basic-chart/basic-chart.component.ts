import { Component, OnInit } from '@angular/core';
import{ ChartService } from '../shared/service/chart.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.css'],
  providers:[FormBuilder]
})

export class BasicChartComponent implements OnInit {
  items:number[] = [1,2,3,4,5,6,7,8,9,10]
  seriesNum:number;
  basicTodo: FormGroup;
  basicData={
    reasonType:'34456'
  }
  constructor(private chartService: ChartService,private formBuilder: FormBuilder) {  }
  ngOnInit() {
    console.log(this.chartService.getECharts());
    this.basicTodo = this.initWork(this.basicData);
    console.log(this.basicTodo)
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      reasonType: ['', Validators.required],
    });
  }
  changeSeries(e) {
    console.log(e.target.value)
  }
  initBasic(aaa) {
    console.log(aaa.value)
  }
}
