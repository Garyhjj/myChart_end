import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '../shared/service/chart.service';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.css']
})

export class BasicChartComponent implements OnInit {

  @ViewChild('phone') myPhone: any;
  @ViewChild('size') sizeInput: any;
  items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  seriesNum: number;
  basicTodo: any;
  showWhere: number = 0;
  basicData = {
    reasonType: '34456'
  };
  myChart: any;
  _isPie: boolean;
  _isDoubleY: boolean;
  hasSwich: boolean = false;
  myOption: any = '';
  colors = this.chartService.colors;
  constructor(private chartService: ChartService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.basicTodo = this.initWork();
    this.titleChange();
    this.basicTodo.controls['series_l'].valueChanges.subscribe((value) => {
      this.changeSeries(value);
    })
    this.basicTodo.controls['colors'].valueChanges.subscribe((val) => {
      this.getDetail({
        type: 100,
        detail: {
          color: val
        }
      })
    })
  }
  //初始化原始數據
  initWork(work: any = {}): FormGroup {
    return this.formBuilder.group({
      series_l: [1, Validators.required],
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
      colors: this.formBuilder.array([
        this.formBuilder.control(this.colors[0])
      ]),
    });
  }
  isDoubleY(e) {
    this._isDoubleY = e.target.checked;
  }
  isPie(e) {
    this._isPie = e.target.checked;
    this.basicTodo.controls['series_l'].setValue('1')
  }
  changeDetail(option) {
    this.myChart && this.myChart.setOption(option);
  }
  getDetail(del) {
    let option: any = this.getOption();
    switch (del.type) {
      case 0:
        [option.yAxis, option.xAxis] = [option.xAxis, option.yAxis];
        this.hasSwich = !this.hasSwich
        break;
      case 1:
        Object.assign(option, del.detail)
        break;
      case 8:
        if (this.hasSwich) {
          Object.assign(option.yAxis[0], del.detail)
        } else {
          Object.assign(option.xAxis[0], del.detail)
        }
        break;
      case 9:
        if (this.hasSwich) {
          Object.assign(option.xAxis[0], del.detail)
        } else {
          Object.assign(option.yAxis[0], del.detail)
        }
        break;
      case 10:
        if (this._isDoubleY) {
          if (this.hasSwich) {
            Object.assign(option.xAxis[1], del.detail)
          } else {
            Object.assign(option.yAxis[1], del.detail)
          }
        }
        break;
      case 98:
        option.yAxis[1] = del.detail;
        break;
      case 99:
        option.yAxis[0] = del.detail;
        break;
      default:
        Object.assign(option, del.detail)
        break;
    }
    this.changeDetail(option)
  }
  changeSeries(value) {
    let num_c = Number(value);
    let num_now: number = this.basicTodo.controls['series'].length;
    let change = ['series', 'seriesType', 'yAxisIndex', 'colors'];
    if (num_now < num_c) {
      for (let i = 0; i < num_c - num_now; i++) {
        for (let y = 0; y < change.length; y++) {
          let arr = this.basicTodo.controls[change[y]] as FormArray;
          let def = '';
          switch (y) {
            case 1:
              def = 'bar';
              break;
            case 2:
              def = '0';
              break;
            case 3:
              def = this.colors[i + 1];
              break;
          };
          arr.push(this.formBuilder.control(def));
        }

      }
    } else if (num_now > num_c) {
      for (let i = 0; i < -(num_c - num_now); i++) {
        for (let y = 0; y < change.length; y++) {
          let arr = this.basicTodo.controls[change[y]] as FormArray;
          arr.removeAt(arr.length - 1);
        }
      }
    }
  }
  initBasic() {
    console.log(this.basicTodo.value)
    if (this.myChart) { this.myChart.clear(); };
    let title = this.basicTodo.value.title;
    let legend_data = this.basicTodo.value.legend_data.split(',');
    let xAxis_data = this.basicTodo.value.xAxis_data.split(',');
    let color = this.basicTodo.value.colors;
    if (this._isPie) {
      this.myOption = this.initPie(title, legend_data, xAxis_data, color)
      this.myChart = this.chartService.makeChart('main2', this.myOption);
    } else {
      this.myOption = this.initNotPie(title, legend_data, xAxis_data, color)
      this.myChart = this.chartService.makeChart('main1', this.myOption);
    }
  }
  initNotPie(title, legend_data, xAxis_data, color) {
    let series: any = [];
    for (let i = 0; i < this.basicTodo.controls['series'].length; i++) {
      let tempSeries = this.basicTodo.controls['series'].controls[i];
      let data = tempSeries.value.split(',');
      data = data.map((value) => {
        return { value: value }
      });
      series.push({
        name: legend_data[i],
        type: this.basicTodo.controls['seriesType'].controls[i].value,
        yAxisIndex: this.basicTodo.controls['yAxisIndex'].controls[i].value,
        data: data
      })
    };
    let option2: any = this.chartService.initDoubleYChart(title, {
      legend_data: legend_data,
      xAxis_data: xAxis_data,
      series: series
    });
    option2.color = color;
    if (!this._isDoubleY) {
      option2.yAxis = [{ type: 'value' }]
    }
    if (this.hasSwich) {
      [option2.yAxis, option2.xAxis] = [option2.xAxis, option2.yAxis];
    }
    // option2.tooltip.formatter = "{b} <br/>{a} : {c}";
    return option2;
  }
  initPie(title, legend_data, xAxis_data, color) {
    let allData: any = [];
    for (let i = 0; i < this.basicTodo.controls['series'].length; i++) {
      let tempSeries = this.basicTodo.controls['series'].controls[i];
      allData = tempSeries.value.split(',');
      allData = allData.map((value, index) => {
        return { value: value, name: legend_data[index] }
      });
    }
    let option: any = this.chartService.initPieChart(title, {
      legend_data: legend_data,
      series: [{
        name: xAxis_data[0], data: allData
      }]
    })
    option.color = color;
    return option;
  }
  titleChange() {
    this.basicTodo.controls['title'].valueChanges.subscribe((value: any) => {
      if (!this.myChart) return;
      this.myChart.setOption({
        title: {
          text: value
        }
      })
    });
  }
  getOption() {
    return this.myOption;
  }
  changeSize(size, point) {
    let mySize = size.value.split('*');
    let style = this.myPhone.nativeElement.style;
    if (Number(mySize[0]) && Number(mySize[1])) {
      if (!point) {
        style.height = Number(mySize[0]) + 'px';
        style.width = Number(mySize[1]) + 'px';
      } else {
        style.height = Number(mySize[1]) + 'px';
        style.width = Number(mySize[0]) + 'px';
      }
    }
    this.myChart && this.myChart.resize();

  }
  selectPhone(value) {
    this.sizeInput.nativeElement.value = value;
  }

  dealCode(val) {
    let opt: any = '';
    try {
      opt = JSON.parse(val)
    } catch (e) {
      console.log(e)
    }
    if (!opt) return;
    this.myOption = opt;
    this.myChart && this.myChart.setOption(opt);
  }
  firstAdd(e) {
    this.getDetail({
      type: 99,
      detail: this.percentAdd(e.target.checked)
    })
  }
  secondAdd(e) {
    this.getDetail({
      type: 98,
      detail: this.percentAdd(e.target.checked)
    })
  }
  percentAdd(checkd: boolean) {
    let del: any = {};
    if (checkd) {
      del = {
        axisLabel: {
          formatter: '{value} %'
        }
      }
    } else {
      del = {
        axisLabel: {
          formatter: '{value}'
        }
      }
    }
    return del
  }

  showOption() {
    console.log(JSON.stringify(this.myOption))
  }
}
