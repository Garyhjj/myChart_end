import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { ChartService } from '../shared/service/chart.service';
import { Subscription } from 'rxjs/rx';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-detail-define',
  templateUrl: './detail-define.component.html',
  styleUrls: ['./detail-define.component.css']
})

export class DetailDefineComponent implements OnInit,OnDestroy {

  @Input() isDoubleY:boolean;
  @Input() isPie:boolean;
  @Output() changeDetail = new EventEmitter();

  detailTodo: any;
  fontSize: number[] = [];
  myHeight: number[] = [];
  myRotate: number[] = [];
  chartSub:Subscription;

  constructor(private chartService: ChartService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    // this.changeDetail.emit('1');
    for (let i = 0; i < 50; i++) {
      this.fontSize.push(i);
    }
    for (let i = 0; i < 101; i++) {
      this.myHeight.push(i);
    }
    for (let i = 0; i < 361; i++) {
      this.myRotate.push(i);
    }
    this.detailTodo = this.initWork();
    this.signSubscribe();
    // this.chartSub = this.chartService.chartTerms.subscribe((val) =>{
    //
    // })
  }
  ngOnDestroy() {
    this.chartSub.unsubscribe();
  }
  signSubscribe() {
    this.switchChange();
    this.legend_orientChange();
    this.legend_positionChange();
    this.legend_fontSizeChange();
    this.title_positionChange();
    this.title_fontSizeChange();
    this.grid_positionChange();
    this.grid_heightChange();
    this.xAxisLabel_fontSizeChange();
    this.yAxisLabel1_fontSizeChange();
    this.yAxisLabel2_fontSizeChange();
    this.xAxisLabel_rotateChange();
    this.yAxisLabel1_rotateChange();
    this.yAxisLabel2_rotateChange();
    this.pie_positionChange();
    this.pie_radiusChange();
    this.scaleChange();
  }
  //初始化原始數據
  initWork(work: any = {}): FormGroup {
    return this.formBuilder.group({
      switch: [false, Validators.required],
      scale: [false, Validators.required],
      title_position: ['', Validators.required],
      title_fontSize: [18, Validators.required],
      legend_orient: ['horizontal', Validators.required],
      legend_position: ['', Validators.required],
      legend_fontSize: [18, Validators.required],
      grid_position: ['', Validators.required],
      grid_height: [90, Validators.required],
      xAxisLabel_fontSize: [18, Validators.required],
      yAxisLabel1_fontSize: [18, Validators.required],
      yAxisLabel2_fontSize: [18, Validators.required],
      xAxisLabel_rotate: [0, Validators.required],
      yAxisLabel1_rotate: [0, Validators.required],
      yAxisLabel2_rotate: [0, Validators.required],
      pie_position: ['', Validators.required],
      pie_radius: ['', Validators.required],
    });
  }
  switchChange() {
    this.detailTodo.controls['switch'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 0,
        detail: ''
      })
    })
  }
  legend_orientChange() {
    this.detailTodo.controls['legend_orient'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 1,
        detail: {
          legend: {
            orient: val,
          },
        }
      })
    })
  }

  legend_positionChange() {
    this.detailTodo.controls['legend_position'].valueChanges.subscribe((val) => {
      let temp = val.split(',');
      let position = this.makePosition(temp);
      this.changeDetail.emit({
        type: 1,
        detail: {
          legend: position
        }
      })
    })
  }

  legend_fontSizeChange() {
    this.detailTodo.controls['legend_fontSize'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 1,
        detail: {
          legend: {
            textStyle: {
              fontSize: val
            }
          },
        }
      })
    })
  }

  title_positionChange() {
    this.detailTodo.controls['title_position'].valueChanges.subscribe((val) => {
      let temp = val.split(',');
      let position = this.makePosition(temp);
      this.changeDetail.emit({
        type: 2,
        detail: {
          title: position
        }
      })
    })
  }

  title_fontSizeChange() {
    this.detailTodo.controls['title_fontSize'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 2,
        detail: {
          title: {
            textStyle: {
              fontSize: val
            }
          },
        }
      })
    })
  }

  grid_positionChange() {
    this.detailTodo.controls['grid_position'].valueChanges.subscribe((val) => {
      let temp = val.split(',');
      let position: any = {};
      switch (temp.length) {
        case 1:
          position = {
            top: temp[0] + '%',
          }
          break;
        case 2:
          position = {
            top: temp[0] + '%',
            left: temp[1] + '%',
          }
          break;
        case 3:
          position = {
            top: temp[0] + '%',
            left: temp[1] + '%',
            bottom: temp[2] + '%',
          }
          break;
        default:
          position = {
            top: temp[0] + '%',
            left: temp[1] + '%',
            bottom: temp[2] + '%',
            right: temp[3] + '%',
          }
          break;
      }
      this.changeDetail.emit({
        type: 6,
        detail: {
          grid: position
        }
      })
    })
  }

  grid_heightChange() {
    this.detailTodo.controls['grid_height'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 7,
        detail: {
          grid: {
            height:val + '%'
          },
        }
      })
    })
  }

  xAxisLabel_fontSizeChange() {
    this.detailTodo.controls['xAxisLabel_fontSize'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 8,
        detail: {
          axisLabel: {
            textStyle:{
              fontSize:val
            }
          }
        }
      })
    })
  }
  yAxisLabel1_fontSizeChange() {
    this.detailTodo.controls['yAxisLabel1_fontSize'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 9,
        detail: {
          axisLabel: {
            textStyle:{
              fontSize:val
            }
          }
        }
      })
    })
  }
  yAxisLabel2_fontSizeChange() {
    this.detailTodo.controls['yAxisLabel2_fontSize'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 10,
        detail: {
          axisLabel: {
            textStyle:{
              fontSize:val
            }
          }
        }
      })
    })
  }
  xAxisLabel_rotateChange() {
    this.detailTodo.controls['xAxisLabel_rotate'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 8,
        detail: {
          axisLabel: {
            rotate:val
          }
        }
      })
    })
  }
  yAxisLabel1_rotateChange() {
    this.detailTodo.controls['yAxisLabel1_rotate'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 9,
        detail: {
          axisLabel: {
            rotate:val
          }
        }
      })
    })
  }
  yAxisLabel2_rotateChange() {
    this.detailTodo.controls['yAxisLabel2_rotate'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 10,
        detail: {
          axisLabel: {
            rotate:val
          }
        }
      })
    })
  }
  pie_positionChange() {
    this.detailTodo.controls['pie_position'].valueChanges.subscribe((val) => {
      let arr = val.split(',');
      this.changeDetail.emit({
        type: 11,
        detail: {
          center: [arr.length>1 && arr[1]?arr[1]+'%':'50%', arr[0]+'%'],
        }
      })
    })
  }
  pie_radiusChange() {
    this.detailTodo.controls['pie_radius'].valueChanges.subscribe((val) => {
      let arr = val.split(',');
      this.changeDetail.emit({
        type: 11,
        detail: {
          radius: [arr.length>1 && arr[1]?arr[1]+'%':'0%', arr[0]+'%'],
        }
      })
    })
  }
  scaleChange() {
    this.detailTodo.controls['scale'].valueChanges.subscribe((val) => {
      this.changeDetail.emit({
        type: 12,
        detail: val
      })
    })
  }
  makePosition(data: number[]) {
    let position: any = {};
    if (data.length > 1) {
      position = {
        top: data[0] + '%',
        left: data[1] + '%'
      }
    } else {
      position = {
        top: data[0] + '%',
      }
    }
    return position;
  }

}
