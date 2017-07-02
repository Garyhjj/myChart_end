import { Component, OnInit, ViewChild } from '@angular/core';
import{ ChartService } from '../shared/service/chart.service';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-detail-define',
  templateUrl: './detail-define.component.html',
  styleUrls: ['./detail-define.component.css']
})

export class DetailDefineComponent implements OnInit {


  constructor(private chartService: ChartService,private formBuilder: FormBuilder) {  }
  ngOnInit() {

  }
}
