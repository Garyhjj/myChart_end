import { Component, OnInit, ViewChild } from '@angular/core';
import{ ChartService } from '../shared/service/chart.service';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.css']
})

export class BasicChartComponent implements OnInit {

  @ViewChild('phone') myPhone: any;
  @ViewChild('size') sizeInput: any;
  items:number[] = [1,2,3,4,5,6,7,8,9,10]
  seriesNum:number;
  basicTodo: any;
  showWhere:number = 0;
  basicData={
    reasonType:'34456'
  };
  myChart:any;
  _isPie:boolean;
  constructor(private chartService: ChartService,private formBuilder: FormBuilder) {  }
  ngOnInit() {
    console.log(this.chartService.getECharts());
    this.basicTodo = this.initWork(this.basicData);
    this.titleChange();
    console.log(this.basicTodo)
  }
  //初始化原始數據
  initWork(work: any): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      legend_data: ['', Validators.required],
      xAxis_data: ['', Validators.required],
      series: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      seriesType: this.formBuilder.array([
        this.formBuilder.control('bar')
      ]),
      yAxisIndex: this.formBuilder.array([
        this.formBuilder.control(0)
      ]),
    });
  }
  isPie(e) {
    this._isPie = e.target.checked;
  }
  changeSeries(e) {
    let num_c = Number(e.target.value);
    let num_now: number = this.basicTodo.controls['series'].length;
    let change = ['series','seriesType','yAxisIndex'];
    if(num_now < num_c)  {
      for(let i=0;i<num_c - num_now ;i++) {
        for(let y=0 ;y<change.length;y++) {
          let arr = this.basicTodo.controls[change[y]] as FormArray;
          let def ='';
          switch(y){
            case 1:
              def ='bar';
              break;
            case 2:
              def ='0';
              break;
          };
          arr.push(this.formBuilder.control(def));
        }

      }
    } else if(num_now > num_c) {
      for(let i=0;i<-(num_c - num_now) ;i++) {
        for(let y=0 ;y<change.length;y++) {
          let arr = this.basicTodo.controls[change[y]] as FormArray;
          arr.removeAt(arr.length-1);
        }
      }
    }
    console.log(e.target.value)
  }
  initBasic() {
    console.log(this.basicTodo.value)
    let title = this.basicTodo.value.title;
    let legend_data = this.basicTodo.value.legend_data.split(',');
    let xAxis_data =  this.basicTodo.value.xAxis_data.split(',');
    if(this._isPie) {
      let option2 = this.initPie(title,legend_data,xAxis_data)
      this.myChart = this.chartService.makeChart('main2', option2);
    } else {
      let option2 = this.initNotPie(title,legend_data,xAxis_data)
      this.myChart = this.chartService.makeChart('main1', option2);
    }
  }
  initNotPie(title, legend_data, xAxis_data) {
    let series:any=[];
    for(let i = 0;i<this.basicTodo.controls['series'].length;i++) {
      let tempSeries = this.basicTodo.controls['series'].controls[i];
      let data = tempSeries.value.split(',');
      data = data.map((value) => {
        return {value:value}
      });
      series.push({
        name:legend_data[i],
        type:this.basicTodo.controls['seriesType'].controls[i].value,
        yAxisIndex:this.basicTodo.controls['yAxisIndex'].controls[i].value,
        data:data
      })
    };
    let option2:any = this.chartService.initDoubleYChart(title, {
      legend_data: legend_data,
      xAxis_data: xAxis_data,
      series: series
    });
    // option2.tooltip.formatter = "{b} <br/>{a} : {c}";
    return option2;
  }
  initPie(title, legend_data, xAxis_data) {
    let allData:any=[];
    for(let i = 0;i<this.basicTodo.controls['series'].length;i++) {
      let tempSeries = this.basicTodo.controls['series'].controls[i];
      allData = tempSeries.value.split(',');
      allData = allData.map((value,index) => {
        return {value:value,name: legend_data[index]}
      });
    }
    return this.chartService.initPieChart(title, {
      legend_data: legend_data,
      series: [{
        name: xAxis_data[0], data: allData
      }]
    })
  }
  titleChange() {
    this.basicTodo.controls['title'].valueChanges.subscribe((value: any) => {
      if(!this.myChart) return;
      this.myChart.setOption({
      title: {
        text: value
      }
    })});
  }
  getOption() {
    this.myChart.getOption()
  }
  changeSize(size,point) {
    let mySize = size.value.split('*');
    let style = this.myPhone.nativeElement.style;
    if (Number(mySize[0]) && Number(mySize[1])) {
      if(!point) {
        style.height = Number(mySize[0])+'px';
        style.width = Number(mySize[1])+'px';
      } else {
        style.height = Number(mySize[1])+'px';
        style.width = Number(mySize[0])+'px';
      }
    }
    this.myChart && this.myChart.resize();

  }
  selectPhone(value) {
    this.sizeInput.nativeElement.value = value;
  }
}
