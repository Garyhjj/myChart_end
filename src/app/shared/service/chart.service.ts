import { Injectable } from '@angular/core';
import * as echarts from 'echarts';

@Injectable()
export class ChartService {

  fontFamily:string[] = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];

  constructor() {  }

  getECharts() {
    return echarts;
  }
  makeChartWithDom(dom:any,option:any) {
    let myChart = echarts.init(dom);
    myChart.setOption(option);
    return myChart;
  }
  makeChart(id:string,option:any) {
    let myChart = echarts.init(document.getElementById(id));
    myChart.setOption(option);
    return myChart;
  }
  afterInit(option:any) {
    option = this.addFontFamily(option);
    return option
  }
  addFontFamily(option:any,fontFamily: string[] = this.fontFamily) {
    let add = {fontFamily: fontFamily};
    Object.assign(option.textStyle,add);
    return option
  }
  initSingleYChart(title: string,
    data:{
      legend_data:string[],
      xAxis_data:string[],
      series: {
        name: string,
        type: string,
        data: {
          value: number
        }[],
      }[]
    }, isY_value:boolean = true) {
    let mySeries:any = data.series;
    mySeries[0].barGap = 0;
    let option:any = {
      title: {
        text: title, textStyle: {
          fontSize: 18
        },
        x:'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        top: '7%',
        textStyle: {
          fontSize: 13
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: mySeries,
      textStyle: {
        fontSize: 18
      }
    }
    if(isY_value) {
      option.yAxis = [{type: 'value'}]
      option.xAxis = [
        {
          type: 'category',
          data: data.xAxis_data,
          axisTick: {
            alignWithLabel: true
          }
        }
      ]
    } else {
      option.xAxis = [{type: 'value'}]
      option.yAxis = [
        {
          type: 'category',
          data: data.xAxis_data,
          axisTick: {
            alignWithLabel: true
          }
        }
      ]
    }
    option = this.afterInit(option);
    return option;
  }

  initPieChart(title: string,
    data:{
      legend_data:string[],
      series:{
        name: string,
        data:{value:number, name: string}[]
      }[]
    }) {
    let mySeries:any = data.series;
    mySeries[0].type = 'pie';
    mySeries[0].itemStyle = {
      emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    mySeries[0].center =['50%','60%'];
    let option = {
    title : {
        text: title,
        textStyle: {
          fontSize: 18
        },
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : <br/>{c} ({d}%)"
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      height: '60%',
      containLabel: true
    },
    legend: {
        orient: 'horizontal',
        top: '7%',
        itemGap: 4,
        textStyle: {
          fontSize: 13
        },
        data: data.legend_data
    },
    series : mySeries,
    textStyle: {

    }
   }
   option = this.afterInit(option);
    return option;
  }

  initDoubleYChart(title: string,
    data:{
      legend_data:string[],
      xAxis_data:string[],
      series: {
        name: string,
        type: string,
        data: {
          value: number
        }[],
      }[]
    },
  data2:{
    name: string,
    type: string,
    data: {
      value: number
    }[],
  }[]) {
    data2 = data2.map((res:any) => {
      res.yAxisIndex = 1;
      return res;
    })
    let mySeries:any = data.series;
    mySeries[0].barGap = 0;
    let option = {
      title: {
        text: title, textStyle: {
          fontSize: '17'
        },
        x:'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.legend_data,
        top: '7%',
        itemGap: 2,
        textStyle: {
          fontSize: 12
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: data.xAxis_data,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
            type: 'value',
            scale: true,
            name: '',
            min: 0,
            boundaryGap: [0.2, 0.2],
            nameTextStyle: {
              fontSize: 14
            }
        },
        {
            type: 'value',
            scale: true,
            name: '',
            nameTextStyle: {
              fontSize: 14
            },
            min: 0,
            boundaryGap: [0.2, 0.2],

           splitLine: {
           	show: false
           }
        }
      ],
      series: mySeries.concat(data2),
      textStyle: {
        fontSize: 18
      }
    }
    option = this.afterInit(option);
    return option;
  }

}