import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import {LogService} from "../shared/log.service";
import {Observable, BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})


export class SelectorComponent implements OnInit{


  constructor(private dateService: DateService) {
   }

    date: BehaviorSubject<moment.Moment>;

    ngOnInit() {

    this.date=this.dateService.getData();

  }

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }

  selectToDay() {

    ///*const day = moment();  //startDay.clone().subtract(0, 'day');
    this.dateService.changeDate(moment());

  }



}
