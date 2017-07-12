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
  _isRoseType: boolean;
  hasSwich: boolean = false;
  isScale: boolean = false;
  percentAdd1: boolean;
  percentAdd2: boolean;
  myOption: any = '';
  itemColor: string = '';
  itemName: string = '';
  item: {
    seriesIndex: number;
    dataIndex: number
  }
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
  isRoseType(e) {
    this._isRoseType = e.target.checked;
    this.getDetail({
      type: 97, detail: {
        roseType: this._isRoseType
      }
    })
  }
  isPie(e) {
    this._isPie = e.target.checked;
  }
  changeDetail(option) {
    this.myChart && this.myChart.setOption(option);
    this.myOption = option;
  }
  getDetail(del) {
    let optionAll: any = this.getOption();
    if (!optionAll) return;
    let option = optionAll.baseOption ? optionAll.baseOption : optionAll
    let media: any[] = optionAll.media ? optionAll.media : [];
    switch (del.type) {
      case 0:
        [option.yAxis, option.xAxis] = [option.xAxis, option.yAxis];
        this.hasSwich = !this.hasSwich
        break;
      case 1:
        Object.assign(option.legend, del.detail.legend)
        break;
      case 2:
        Object.assign(option.title, del.detail.title)
        break;
      case 6:
        Object.assign(option.grid, del.detail.grid)
        break;
      case 7:
        Object.assign(option.grid, del.detail.grid)
        break;
      case 8:
        if (this.hasSwich) {
          option.yAxis[0].axisLabel = option.yAxis[0].axisLabel ? option.yAxis[0].axisLabel : {}
          Object.assign(option.yAxis[0].axisLabel, del.detail.axisLabel)
        } else {
          option.xAxis[0].axisLabel = option.xAxis[0].axisLabel ? option.xAxis[0].axisLabel : {}
          Object.assign(option.xAxis[0].axisLabel, del.detail.axisLabel)
        }
        break;
      case 9:
        if (this.hasSwich) {
          option.xAxis[0].axisLabel = option.xAxis[0].axisLabel ? option.xAxis[0].axisLabel : {}
          Object.assign(option.xAxis[0].axisLabel, del.detail.axisLabel)
        } else {
          option.yAxis[0].axisLabel = option.yAxis[0].axisLabel ? option.yAxis[0].axisLabel : {}
          Object.assign(option.yAxis[0].axisLabel, del.detail.axisLabel)
        }
        break;
      case 10:
        if (this._isDoubleY) {
          if (this.hasSwich) {
            option.xAxis[1].axisLabel = option.xAxis[1].axisLabel ? option.xAxis[1].axisLabel : {}
            Object.assign(option.xAxis[1].axisLabel, del.detail.axisLabel)
          } else {
            option.yAxis[1].axisLabel = option.yAxis[1].axisLabel ? option.yAxis[1].axisLabel : {}
            Object.assign(option.yAxis[1].axisLabel, del.detail.axisLabel)
          }
        }
        break;
      case 11:
        Object.assign(option.series[0], del.detail)
        break;
      case 12:
        this.isScale = del.detail;
        if (del.detail) {
          let query = [
            {
              query: {
                maxWidth: 2560,
              },
              option: {
                dataZoom: [{
                  type: 'inside',
                  disabled: true,
                  start: 1,
                  end: 100
                }]
              }
            },
            {
              query: {
                maxWidth: 420,
              },
              option: {
                dataZoom: [{
                  type: 'inside',
                  disabled: false,
                  xAxisIndex: [0],
                  start: 1,
                  end: 35
                }]
              }
            }
          ]
          media = media.concat(query);
        } else {
          let query = [
            {
              query: {
                maxWidth: 420,
              },
              option: {
                dataZoom: [{
                  type: 'inside',
                  disabled: true,
                  xAxisIndex: [0],
                  start: 1,
                  end: 100
                }]
              }
            }
          ]
          media = media.concat(query);
        }
        break;
      case 96:
        let data = option.series[this.item.seriesIndex].data[this.item.dataIndex] || '';
        if (!data) return;
        data.itemStyle = data.itemStyle || {};
        data.itemStyle.normal = data.itemStyle.normal || {};
        Object.assign(data.itemStyle.normal, del.detail.normal);
        break;
      case 97:
        Object.assign(option.series[0], del.detail);
        break;
      case 98:
        Object.assign(option.yAxis[1], del.detail)
        break;
      case 99:
        Object.assign(option.yAxis[0], del.detail)
        break;
      default:
        Object.assign(option, del.detail)
        break;
    }
    if (media.length > 0) {
      optionAll = {
        baseOption: option,
        media: media
      }
    } else {
      optionAll = option
    }
    this.changeDetail(optionAll)
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
    this.firstAdd(this.percentAdd1);
    if (this._isDoubleY) {
      this.secondAdd(this.percentAdd2);
    }
    this.myChart.on('click', (item) => {
      console.log(item);
      this.showItemColor(item)
    })
    console.log(this.myChart)
  }
  showItemColor(item) {
    this.item = {
      seriesIndex: item.seriesIndex,
      dataIndex: item.dataIndex
    }
    this.itemName = `系列${item.seriesIndex + 1}的第${item.dataIndex + 1}个数据的颜色`;
    this.itemColor = item.color;
  }
  changeItemColor() {
    console.log(this.itemColor)
    this.getDetail({
      type: 96,
      detail: {
        normal: {
          color: this.itemColor
        }
      }
    })
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
      allData.push(Number(tempSeries.value));

    }
    allData = allData.map((value, index) => {
      return { value: value, name: legend_data[index] }
    });
    let option: any = this.chartService.initPieChart(title, {
      legend_data: legend_data,
      series: [{
        name: xAxis_data[0], data: allData
      }]
    })
    option.color = color;
    if (this.isRoseType) {
      option.series[0].roseType = true;
    }
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
      detail: this.percentAdd(e)
    })
  }
  secondAdd(e) {
    this.getDetail({
      type: 98,
      detail: this.percentAdd(e)
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
    if (this.isScale) {
      console.log(JSON.stringify(this.myOption))
      console.log(this.myOption)
    } else {
      if (this.myOption.baseOption) {
        console.log(JSON.stringify(this.myOption.baseOption))
        console.log(this.myOption.baseOption)
      } else {
        console.log(JSON.stringify(this.myOption))
        console.log(this.myOption)
      }
    }
  }
  reDraw() {
    this.myChart.clear();
    this.myChart.setOption(this.myOption);
  }
}
